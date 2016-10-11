/**
 * Query model events
 */

'use strict';

import {EventEmitter} from 'events';
var Query = require('../../sqldb').Query;
var QueryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QueryEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Query.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    QueryEvents.emit(event + ':' + doc._id, doc);
    QueryEvents.emit(event, doc);
    done(null);
  };
}

export default QueryEvents;
