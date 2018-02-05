var Events = {
	events: {},

	on: function(eventName, callback) {
		if (!this.events[eventName])
			this.events[eventName] = [];
		this.events[eventName].push(callback);
	},

	fire: function(eventName, args, context) {
		if (!this.events[eventName])
			this.events[eventName] = [];
		for (var event of this.events[eventName])
			event.apply(context, args);
	}
};
