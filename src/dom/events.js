import { defaultdict, list } from "../mods/pythonic";

export class EventContainer {

  constructor() {
      this.events = defaultdict(list, true);
      this.events_once = defaultdict(list, true);
      this.events_fired = defaultdict(()=>false, true);
  }

  // Observer pattern
  on(eventName, callback) {
    this.events[eventName].push(callback);
  }

  // Single-time event
  once(eventName, callback) {
    this.events_once[eventName].push(callback);
  }

  // Single-time event, triggered by past events
  past(eventName, callback) {
    if (this.events_fired[eventName])
      callback();
    else
      return this.once(eventName, callback);
  }

  // Remove all subscribers
  clear(eventName) {
    this.events[eventName] = [];
    this.events_once[eventName] = [];
  }

  // Start event propagation (for both kinds)
  fire(eventName, ...args) {
    // events
    for (var event of this.events[eventName])
      event(...args);

    // single time events_once
    for (var event of this.events_once[eventName])
      event(...args);

    // remove all fired events_once:
    this.events_once[eventName] = [];

    // flag
    this.events_fired[eventName] = true;
  }
};
