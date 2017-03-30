import { INotificationOptions } from "./interfaces/INotificationOptions";

/** Default INotificationOptions for the different notification types. */
export default class NotificationDefaults {
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