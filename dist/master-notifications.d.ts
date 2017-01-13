declare namespace MasterNotifications {
    /**
     * A NotificationController deals with creating any and all notifications.
     * These notifications will be displayed in the specified container.
     */
    class NotificationController {
        /**
         * Constructs a NotificationController. All notifications will appear in the specified $container.
         * @param container The container that all notifications will be displayed within.
         * @param options Options to control functionality within NotificationController.
         */
        constructor(container: Element, options?: INotificationControllerOptions);
        /**
         * Displays a success notification.
         * @param message The message that will be displayed within the success notification.
         * @param options INotificationOptions to modify the notification.
         */
        success(message: string, options?: INotificationOptions): void;
        /**
         * Displays an info notification.
         * @param message The message that will be displayed within the info notification.
         * @param options INotificationOptions to modify the notification.
         */
        info(message: string, options?: INotificationOptions): void;
        /**
         * Displays a warning notification.
         * @param message The message that will be displayed within the warning notification.
         * @param options INotificationOptions to modify the notification.
         */
        warning(message: string, options?: INotificationOptions): void;
        /**
         * Displays a error notification.
         * @param message The message that will be displayed within the error notification.
         * @param options INotificationOptions to modify the notification.
         */
        error(message: string, options?: INotificationOptions): void;
        /**
         * Contains logic to create a notification and display it.
         * @param message The message to be displayed within the notification.
         * @param type The type of notification to display.
         * @param options INotificationOptions to modify the notification.
         */
    }

    /** Options for modular aspects of a Notification. */
    interface INotificationOptions {
        /** The amount of time (in seconds) that the notification will appear before disappearing. If set to 0, the notification will stay forever. */
        showTime?: number;
        /** If true, a close button will be displayed on the upper right of the notification. If false, clicking on the notification will close it. */
        showCloseButton?: boolean;
    }

    /** Options for modifying the NotificationController. */
    interface INotificationControllerOptions {
        /** 
         * Key code for the key to toggle the terminal. 
         * Defaults to ` (192). 
         * Set to -1 to remove key toggle functionality.  
         */
        terminalToggleKeyCode?: number;
    }
}