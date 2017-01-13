/** Options for modifying the NotificationController. */
export interface INotificationControllerOptions {
    /** 
     * Key code for the key to toggle the terminal. 
     * Defaults to ` (192). 
     * Set to -1 to remove key toggle functionality.  
     */
    terminalToggleKeyCode?: number;
}