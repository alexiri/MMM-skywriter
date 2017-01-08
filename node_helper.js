'use strict';

const NodeHelper = require('node_helper');
const PythonShell = require('python-shell');
var pythonStarted = false

module.exports = NodeHelper.create({

	python_start: function () {
		const self = this;
		const pyshell = new PythonShell('modules/' + this.name + '/MMM-skywriter.py', { mode: 'json', args: [JSON.stringify(this.config)]});

		pyshell.on('message', function (message) {
			console.log("node_helper_[" + self.name + "] " + message.type + ": " + message.data);
			self.sendSocketNotification("SKYWRITER_"+message.type.toUpperCase(), message.data);
		});

		 pyshell.end(function (err) {
			console.log("node_helper_[" + self.name + "] " + 'finished running...');
			self.sendSocketNotification("SKYWRITER_STATUS", 'python_end');
			if (err) throw err;
		});
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if(notification === 'CONFIG') {
			this.config = payload
				if(!pythonStarted) {
					pythonStarted = true;
					this.python_start();
				};
		};
	}

});
