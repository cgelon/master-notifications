import { INotificationOptions } from "./interfaces/INotificationOptions";

/** Default INotificationOptions for the different notification types. */
export default class NotificationDefaults {
    public static readonly SuccessOptions: INotificationOptions = {
        showTimeInSeconds: 5,
        showCloseButton: false
    };
    public static readonly InfoOptions: INotificationOptions = {
        showTimeInSeconds: 8,
        showCloseButton: false
    };
    public static readonly WarningOptions: INotificationOptions = {
        showTimeInSeconds: 0,
        showCloseButton: true
    };
    public static readonly ErrorOptions: INotificationOptions = {
        showTimeInSeconds: 0,
        showCloseButton: true
    };
}