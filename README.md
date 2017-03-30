# master-notifications - Smooth Notifications at your Disposal

**master-notifications** strives to masterfully creates and controls fast and smooth notifications with low overhead.

### Types of Notifications
-----

* success
* info
* warning
* error

### Documentation
-----

Look at *testpage.html* for an example on how to use **master-notifications**.

Add links to both the css and javascript:
```html
<link rel="stylesheet" type="text/css" href="dist/master-notifications.css" />
<script src="dist/master-notifications.js"></script>
```
You will also need both jquery and moment:
```html
<script src="jquery.min.js"></script>
<script src="moment.js"></script>
```

#### NotificationController

Create a new NotificationController:
```javascript
var notificationController = new MasterNotifications.NotificationController($("#container"));
```

In addition, there are options for the controller:
```javascript
var notificationController = new MasterNotifications.NotificationController($("#container"), options);
```

#### INotificationControllerOptions

Option|Type|Default|Description
---|---|:---:|---
terminalToggleKeyCode|`number`|\` (192)|Key code for the key to toggle the terminal. Set to -1 to remove key toggle functionality.

#### Notifications

And start making notifications:
```javascript
notificationController.success("Notification successfully created!");
```

For additional options, pass in *INotificationOptions* when creating a notification:
```javascript
notificationController.success("Notification with options...", options);
```

#### INotificationOptions

Option|Type|Success Default|Info Default|Warning Default|Error Default|Description
---|---|:---:|:---:|:---:|:---:|---
showTime|`number`|5|8|0|0|The amount of time (in seconds) that the notification will appear before disappearing. If set to 0, the notification will stay forever.
showCloseButton|`boolean`|false|false|true|true|If true, a close button will be displayed on the upper right of the notification. If false, clicking on the notification will close it.
