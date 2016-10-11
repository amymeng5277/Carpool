/**
 * Trip model events
 */

'use strict';

import {EventEmitter} from 'events';
var Trip = require('../../sqldb').Trip;
var TripEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TripEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Trip.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TripEvents.emit(event + ':' + doc._id, doc);
    TripEvents.emit(event, doc);
    done(null);
  };
}

export default TripEvents;
