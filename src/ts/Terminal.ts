import { NotificationType } from "./NotificationType";
import Notification from "./Notification";
import * as Moment from "moment";

export default class Terminal {
    private static readonly notSelectedClass: string = "masternotifications-terminal-filter-notselected";

    private _$container: JQuery;
    private _$terminal: JQuery;
    private _$filters: JQuery;
    private _$notifications: JQuery;

    constructor($container: JQuery) {
        this._$container = $container.addClass("masternotifications-terminal-container");

        this._$terminal = $(`<div class="masternotifications-terminal"></div>`)
        this._$container.append(this._$terminal);

        this._$filters = $(`<div class="masternotifications-terminal-filters"></div>`);
        this._$terminal.append(this._$filters);
        const $successFilter: JQuery = $(`<div class="masternotifications-terminal-filter masternotifications-terminal-filter-success" data-type="success">Success</div>`);
        const $infoFilter: JQuery = $(`<div class="masternotifications-terminal-filter masternotifications-terminal-filter-info" data-type="info">Info</div>`);
        const $warningFilter: JQuery = $(`<div class="masternotifications-terminal-filter masternotifications-terminal-filter-warning" data-type="warning">Warning</div>`);
        const $errorFilter: JQuery = $(`<div class="masternotifications-terminal-filter masternotifications-terminal-filter-error" data-type="error">Error</div>`);
        this._$filters.append($successFilter).append($infoFilter).append($warningFilter).append($errorFilter);

        this._$notifications = $(`<div class="masternotifications-terminal-messages"></div>`);
        this._$terminal.append(this._$notifications);

        this._$filters.on("click.changeFilter", ".masternotifications-terminal-filter", (event: JQueryEventObject) => {
            const $filter: JQuery = $(event.currentTarget);
            $filter.toggleClass(Terminal.notSelectedClass);
            const type: string = $filter.data("type");
            const notificationsOfType: JQuery = this._$notifications.find(`.masternotifications-${type}`).parent();
            if ($filter.hasClass(Terminal.notSelectedClass)) {
                notificationsOfType.hide();
            } else {
                notificationsOfType.show();
            }
        });
    }

    public get isVisible(): boolean {
        return this._$container.is(":visible");
    }

    public addNotification(notification: Notification): void {
        const $terminalNotificationContainer: JQuery = $(`<div class="masternotifications-terminal-notification-container"></div>`);
        const $terminalNotificationTimestamp: JQuery = $(`<div class="masternotifications-terminal-notification-timestamp">${Moment().format("LTS")}</div>`);
        const $terminalNotification: JQuery = $(`<div class="masternotifications-terminal-notification masternotifications-${notification.type}">${notification.message}</div>`);
        $terminalNotificationContainer.append($terminalNotificationTimestamp).append($terminalNotification);
        this._$notifications.prepend($terminalNotificationContainer);
        if (this.getFilterOfType(notification.type).hasClass(Terminal.notSelectedClass)) {
            $terminalNotificationContainer.hide();
        }
    }

    public open(): void {
        this._$container.show();
    }

    public toggle(): void {
        this._$container.toggle();
    }

    public close(): void {
        this._$container.hide();
    }

    private getFilterOfType(type: string): JQuery {
        return this._$filters.find(`[data-type="${type}"]`);
    }
}