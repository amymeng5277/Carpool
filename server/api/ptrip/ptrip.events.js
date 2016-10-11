/**
 * Ptrip model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ptrip = require('../../sqldb').Ptrip;
var PtripEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PtripEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Ptrip.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PtripEvents.emit(event + ':' + doc._id, doc);
    PtripEvents.emit(event, doc);
    done(null);
  };
}

export default PtripEvents;
