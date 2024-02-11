import { defaultdict, list } from "../mods/pythonic.js";

export class EventContainer {
  #events = defaultdict(list, true);
  #events_once = defaultdict(list, true);
  #events_fired = defaultdict(()=>false, true);

  constructor() {
  }

  // Observer pattern
  on(eventName, callback) {
    this.#events[eventName].push(callback);
  }

  // Single-time event
  once(eventName, callback) {
    this.#events_once[eventName].push(callback);
  }

  // Single-time event, triggered by past events
  past(eventName, callback) {
    if (this.#events_fired[eventName])
      callback();
    else
      return this.once(eventName, callback);
  }

  // Start event propagation (for both kinds)
  fire(eventName, ...args) {
    // events
    for (var event of this.#events[eventName])
      event(...args);

    // single time events_once
    for (var event of this.#events_once[eventName])
      event(...args);

    // remove all fired events_once:
    this.#events_once[eventName] = [];

    // flag
    this.#events_fired[eventName] = true;
  }

  has(eventName) {
    return this.#events[eventName] || this.#events_once[eventName];
  }

  get events() {
    return new Set(Object.keys(this.#events).concat(Object.keys(this.#events_once)));
  }

  // Remove all subscribers
  clear(eventName) {
    this.#events[eventName] = [];
    this.#events_once[eventName] = [];
  }
};
