/**
 * Driver model events
 */

'use strict';

import {EventEmitter} from 'events';
var Driver = require('../../sqldb').Driver;
var DriverEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DriverEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Driver.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DriverEvents.emit(event + ':' + doc._id, doc);
    DriverEvents.emit(event, doc);
    done(null);
  };
}

export default DriverEvents;
