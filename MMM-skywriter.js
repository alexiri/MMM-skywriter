Module.register("MMM-skywriter",{

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		console.log ("socketnotificationreceived.", notification, payload);
		if (notification.startsWith("SKYWRITER_")) {
			if (notification === 'SKYWRITER_STATUS') {
				Log.log(notification, payload);
				if (payload === 'python_end') {
					// Restart python
					this.sendSocketNotification('CONFIG', this.config);
				}
			} else {
				this.sendNotification(notification, payload);
			}

			/*const self = this;

			self.sendNotification(notification, payload);

			if (payload === "up"){
				console.log("test - up");
				MM.getModules().withClass(this.config.defaultClass).exceptWithClass(this.config.everyoneClass).enumerate(function(module) {
					module.hide(1000, function() {
						Log.log(module.name + ' is hidden.');
					});
				});

				MM.getModules().withClass("class_up_1_show").enumerate(function(module) {
					module.show(1000, function() {
						Log.log(module.name + ' is shown.');
					});
				});
			}
			else if (payload === "left") {
				console.log("test - left");
			}
			else if (payload === "down") {
				console.log("test - down");

				MM.getModules().withClass("class_up_1_show").enumerate(function(module) {
					module.hide(1000, function() {
						Log.log(module.name + ' is hidden by gesture.');
					});
				});
			}*/
		}
	},

	notificationReceived: function(notification, payload, sender) {
		/*if (notification === 'DOM_OBJECTS_CREATED') {
			MM.getModules().exceptWithClass("default").enumerate(function(module) {
				module.hide(1000, function() {
					Log.log('Module is hidden.');
				});
			});
		}*/
	},

	start: function() {
		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}

});
