/**
 * Passenger model events
 */

'use strict';

import {EventEmitter} from 'events';
var Passenger = require('../../sqldb').Passenger;
var PassengerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PassengerEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Passenger.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PassengerEvents.emit(event + ':' + doc._id, doc);
    PassengerEvents.emit(event, doc);
    done(null);
  };
}

export default PassengerEvents;
