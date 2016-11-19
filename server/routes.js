/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/vehicles', require('./api/vehicle'));
  app.use('/api/trips', require('./api/trip'));
  app.use('/api/querys', require('./api/query'));
  app.use('/api/passengers', require('./api/passenger'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/drivers', require('./api/driver'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // ---BEGIN---
  // The routing that was done previously doesn't match the API that was specified, so
  // I created dummy ones here that don't actually connect with the DB.
  app.route('/query')
    .all(function(req, res) {
      // this does a search based on to, from, and date
      if (req.method == 'GET') {
        var emptyResponse = {
          'result': []
        }
        var dummyResponse = {
          'result': [
            {
              'pick-up': {
                'city': 'Waterloo',
                'address': '200 Univeristy Avenue'
              },
              'drop-off': {
                'city': 'Toronto',
                'address': '3422 College Street'
              },
              'time': 1485824968,
              'spots': 3,
              'vehicle': {
                'type': 'Sedan',
                'make': 'Honda',
                'model': 'Civic',
                'year': 2016,
                'seats': 4
              },
              'preferences': [
                {'pref':'female'},
                {'pref':'music'}
              ],
              'tripid': 99999
            },
            {
              'pick-up': {
                'city': 'Missisauga',
                'address': '100 City Center Dr.'
              },
              'drop-off': {
                'city': 'New Market',
                'address': '438 Park Ave'
              },
              'time': 1483214788,
              'spots': 1,
              'vehicle': {
                'type': 'Sedan',
                'make': 'Subaru',
                'model': 'WRX',
                'year': 2005,
                'seats': 5
              },
              'preferences': [
                {'pref':'female'},
                {'pref':'music'},
                {'pref':'wheelchair'}
              ],
              'tripid': 21321
            }
          ]
        };
        var displayEmpty = Math.random() > 0.5;
        if (displayEmpty) {
          res.write(JSON.stringify(emptyResponse));
        } else {
          res.write(JSON.stringify(dummyResponse));
        }
        res.end();

      // this is when no search exists, so create an entry in the database
      } else if (req.method == 'POST') {
        console.log("Adding to the query database: pickup: " + req.query.pickup + " dropoff: " + req.query.dropoff + " time: " + req.query.time);
        console.log("Will notify the user when there is an available ride for him.");
      }
    });

  app.route('/tripid')
    .all(function(req, res) {
      // posting a trip request 
      if (req.method == 'POST') {
        if (req.query.tripid != '') {
          console.log('Adding user to tripid: ' + req.query.tripid);
        } else {
          console.log('Creating a trip');          
        }
      }
  });

  // ---END---

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
