
export class EventContainer {
  #events = new Map();
  #events_once = new Map();
  // #events_fired = new Set();

  constructor() {
  }

  // Observer pattern
  on(eventName, callback) {
    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, []);
    }
    this.#events.get(eventName).push(callback);
  }

  // Single-time event
  once(eventName, callback) {
    if (!this.#events_once.has(eventName)) {
      this.#events_once.set(eventName, []);
    }
    this.#events_once.get(eventName).push(callback);
  }

  // Single-time event, triggered by past events
  past(eventName, callback) {
    if (this.#events_once.has(eventName)) {
      callback();
    } else {
      return this.once(eventName, callback);
    }
  }

  // Start event propagation (for both kinds)
  fire(eventName, ...args) {
    // events
    for (var event of this.#events.get(eventName))
      event(...args);

    // single time events_once
    for (var event of this.#events_once.get(eventName))
      event(...args);

    // remove all fired events_once:
    this.#events_once.delete(eventName);

    // flag
    // this.#events_fired[eventName] = true;
  }

  // Remove all subscribers
  off(eventName) {
    this.#events.delete(eventName);
    this.#events_once.delete(eventName);
  }

  clear(eventName) {
    return this.off(eventName);
  }

  has(eventName) {
    return this.#events.has(eventName) || this.#events_once.has(eventName);
  }

  get events() {
    return new Set([...this.#events.keys(), ...this.#events_once.keys()]);
  }
};
