/** Options for modular aspects of a Notification. */
export interface INotificationOptions {
    /** The amount of time (in seconds) that the notification will appear before disappearing. If set to 0, the notification will stay forever. */
    showTimeInSeconds?: number;
    /** If true, a close button will be displayed on the upper right of the notification. If false, clicking on the notification will close it. */
    showCloseButton?: boolean;
}