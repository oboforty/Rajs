var Events = {
	events: {},
	callbacks: {},

	// Observer pattern
	on: function(eventName, callback) {
		if (!this.events[eventName])
			this.events[eventName] = [];
		this.events[eventName].push(callback);
	},

	// Single-time event
	once: function(eventName, callback) {
		if (!this.callbacks[eventName])
			this.callbacks[eventName] = [];
		this.callbacks[eventName].push(callback);
	},

	// Start event propagation (for both kinds)
	fire: function(eventName, args, context) {
		// events
		if (!this.events[eventName])
			this.events[eventName] = [];
		for (var event of this.events[eventName])
			event.apply(context, args);

		// single time callbacks
		if (!this.callbacks[eventName])
			this.callbacks[eventName] = [];
		for (var event of this.callbacks[eventName])
			event.apply(context, args);
		// remove all fired callbacks:
		this.callbacks[eventName] = [];
	}
};
