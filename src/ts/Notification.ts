import "jquery";
import { INotificationOptions } from "./interfaces/INotificationOptions";
import { NotificationType } from "./types/NotificationType";
import "../styles/notification.scss";

/**
 * A notification contains logic on how to create itself, appear, and disappear.
 * To allow the notification to grow and shrink, we must set the height to use em and adjust the font-size.
 */
export default class Notification {
    /** Event to notify the controller that this notification has been completly removed. */
    public static readonly NotificationRemovedEvent: string = "masternotifications.removed";

    private readonly _id: number;
    private readonly _$container: JQuery;
    private readonly _message: string;
    private readonly _type: NotificationType;
    private readonly _options: INotificationOptions;

    /**
     * Creates a notification to be displayed. Must call start for the notification to show.
     * @param message The message to be inside of the notification.
     * @param type The type of the notification to apply styling.
     * @param options Options pertaining to specialized functions for the notifications.
     */
    constructor(message: string, type: NotificationType, options: INotificationOptions) {
        this._id = Math.floor(Math.random() * 10000000000000001)
        this._message = message;
        this._type = type;
        this._options = options;

        this._$container = $(`<div class="masternotifications-notification masternotifications-notification-${type}" data-id="${this._id}"></div>`).hide();

        if (options.showCloseButton) {
            this._$container.append(`<div class="masternotifications-notification-close-button">&#10006;</div>`);
            this._$container.on("click.removeNotification", ".masternotifications-notification-close-button", (event: JQueryEventObject) => {
                this.remove();
            });
        } else {
            this._$container.on("click.removeNotification", (event: JQueryEventObject) => {
                this.remove();
            });
        }

        this._$container.append(`<div class="masternotifications-notification-message">${message}</div>`);
        if (options.showTime > 0) {
            this._$container.append(`<div class="masternotifications-notification-progressbar"></div>`);
        }

        this.$container.on("animationend", (event: JQueryEventObject) => {
            switch((<AnimationEvent>event.originalEvent).animationName){
                // Once the progress bar has finished.
                case "masternotifications-timeProgress":
                    this.remove();
                    break;
                // Once the notification has grown.
                case "masternotifications-increaseFontSize":
                    this.$container.removeClass("masternotifications-fontsize-increase")
                    this.maxHeight = "";
                    if (this._options.showTime > 0) {
                        this.addProgressBar(this._options.showTime);
                    }
                    break;
                // Once the notification has shrunk.
                case "masternotifications-decreaseFontSize":
                    this.$container.trigger(Notification.NotificationRemovedEvent).off("animationend");
                    this.$container.remove();
                    break;
            }
        });
    }

    /** The JQuery container that holds this notification. */
    public get $container(): JQuery {
        return this._$container;
    }

    /** The id for this notification. */
    public get id(): number {
        return this._id;
    }

    /** The message displayed in this notification. */
    public get message(): string {
        return this._message;
    }

    /** The type of this notification. */
    public get type(): NotificationType {
        return this._type;
    }

    /** The height of the notification in em. */
    private get containerHeightInEm(): string {
        const height: number = this.$container.height();
        const fontSize: number = parseInt(this.$container.css("font-size"));
        return `${height / fontSize}em`;
    }

    /** The max height of the notification. */
    private set maxHeight(maxHeight: string) {
        this.$container[0].style.maxHeight = maxHeight;
    }

    /**
     * After creation, starting the notification will make it appear.
     */
    public start(): void {
        this.maxHeight = this.containerHeightInEm;
        this.$container.addClass("masternotifications-fontsize-increase").show();
    }

    /**
     * Removes the notification from the DOM.
     */
    public remove(): void {
        this.maxHeight = this.containerHeightInEm;
        this.$container.addClass("masternotifications-fontsize-decrease");
    }

    /** Adds a progress bar, which will go from 100 to 0 in the specified seconds. */
    private addProgressBar(showTimeInSeconds: number): void {
        const $progressBar: JQuery = this.$container.children(".masternotifications-notification-progressbar");
        $progressBar[0].style.animationDuration = `${showTimeInSeconds}s`;
        $progressBar.addClass("masternotifications-progress");
    }
}