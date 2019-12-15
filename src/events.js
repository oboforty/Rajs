var Events = {
  events: defaultdict(list, true),
  events_once: defaultdict(list, true),
  events_fired: defaultdict(()=>false, true),

  // Observer pattern
  on: function(eventName, callback) {
    this.events[eventName].push(callback);
  },

  // Single-time event
  once: function(eventName, callback) {
    this.events_once[eventName].push(callback);
  },

  // Single-time event, triggered by past events
  past: function(eventName, callback) {
    if (this.events_fired[eventName])
      callback();
    else
      return this.once(eventName, callback);
  },

  // Remove all subscribers
  clear: function(eventName) {
    this.events[eventName] = [];
    this.events_once[eventName] = [];
  },

  // Start event propagation (for both kinds)
  fire: function(eventName, args, context) {
    // events
    for (var event of this.events[eventName])
      event.apply(context, args);

    // single time events_once
    for (var event of this.events_once[eventName])
      event.apply(context, args);

    // remove all fired events_once:
    this.events_once[eventName] = [];

    // flag
    this.events_fired[eventName] = true;
  }
};
