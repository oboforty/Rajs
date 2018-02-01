var Events = {
	this.events = {};
	this.on = function(eventName, callback) {
		if (!this.events[eventName])
			this.events[eventName] = [];
		this.events[eventName].push(callback);
	}

	this.fire = function(eventName, args) {
		if (!this.events[eventName])
			this.events[eventName] = [];
		for (var event of this.events[eventName])
			event.apply(args);
	}
};
