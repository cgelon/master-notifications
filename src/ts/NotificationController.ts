import { INotificationOptions } from "./INotificationOptions";
import { NotificationType } from "./NotificationType";
import Notification from "./Notification";

/**
 * A NotificationController deals with creating any and all notifications.
 * These notifications will be displayed in the specified container.
 */
export class NotificationController {
    private readonly _$container: JQuery;
    private readonly _$dismissAllButton: JQuery;
    private readonly _notifications: { [id: number]: Notification };

    /**
     * Constructs a NotificationController. All notifications will appear in the specified $container.
     * @param container The container that all notifications will be displayed within.
     */
    constructor(container: Element) {
        this._$container = $(container).addClass("masternotifications-controller-container");
        this._notifications = {};

        this._$container.on(Notification.NotificationRemovedEvent, ".masternotifications-container", (event: JQueryEventObject) => {
            delete this._notifications[$(event.currentTarget).data("id")];
            this.checkForMultipleNotifications();
        })
        
        this._$dismissAllButton = $(`<div class="masternotifications-dismissall-button masternotifications-container">Dismiss All</div>`)
            .hide()
            .on("click", (event: JQueryEventObject) => {
                for (const id in this._notifications) {
                    this._notifications[id].remove();
                }
            });
        this._$container.append(this._$dismissAllButton);
    }

    /**
     * Displays a success notification.
     * @param message The message that will be displayed within the success notification.
     * @param options INotificationOptions to modify the notification.
     */
    public success(message: string, options?: INotificationOptions): void {
        this.createNotification(message, "success", { ...Defaults.SuccessOptions, ...options });
    }

    /**
     * Displays an info notification.
     * @param message The message that will be displayed within the info notification.
     * @param options INotificationOptions to modify the notification.
     */
    public info(message: string, options?: INotificationOptions): void {
        this.createNotification(message, "info", { ...Defaults.InfoOptions, ...options });
    }

    /**
     * Displays a warning notification.
     * @param message The message that will be displayed within the warning notification.
     * @param options INotificationOptions to modify the notification.
     */
    public warning(message: string, options?: INotificationOptions): void {
        this.createNotification(message, "warning", { ...Defaults.WarningOptions, ...options });
    }

    /**
     * Displays a error notification.
     * @param message The message that will be displayed within the error notification.
     * @param options INotificationOptions to modify the notification.
     */
    public error(message: string, options?: INotificationOptions): void {
        this.createNotification(message, "error", { ...Defaults.ErrorOptions, ...options });
    }

    /**
     * Contains logic to create a notification and display it.
     * @param message The message to be displayed within the notification.
     * @param type The type of notification to display.
     * @param options INotificationOptions to modify the notification.
     */
    private createNotification(message: string, type: NotificationType, options: INotificationOptions): void {
        const notification: Notification = new Notification(message, type, options);
        this._$container.prepend(notification.$container);
        this._notifications[notification.id] = notification;
        notification.start();
        this.checkForMultipleNotifications();
    }

    /** If there are multiple notifications, display the dismiss all button. Otherwise, hide it. */
    private checkForMultipleNotifications(): void {
        if (Object.keys(this._notifications).length > 1) {
            this._$dismissAllButton.slideDown(100);
        } else {
            this._$dismissAllButton.slideUp(100);
        }
    }
}

/** Default INotificationOptions for the different notification types. */
class Defaults {
    public static readonly SuccessOptions: INotificationOptions = {
        showTime: 5,
        showCloseButton: false
    };
    public static readonly InfoOptions: INotificationOptions = {
        showTime: 8,
        showCloseButton: false
    };
    public static readonly WarningOptions: INotificationOptions = {
        showTime: 0,
        showCloseButton: true
    };
    public static readonly ErrorOptions: INotificationOptions = {
        showTime: 0,
        showCloseButton: true
    };
}