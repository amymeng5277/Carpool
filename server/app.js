/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
var logger = require('tracer').console();

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);
var match = require('./match');

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// Match every 5 minutes or when a search, or query, or post generated
function startMatchBackground () {
  setInterval(function() {
    logger.info('Matching...');
    match.runMatch();
  }, 1000 * 60 * 10);
}

sqldb.sequelize.sync()
  .then(startServer)
  .then(startMatchBackground)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
