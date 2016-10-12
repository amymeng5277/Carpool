/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Vehicle = db.sequelize.import('../api/vehicle/vehicle.model');
db.Trip = db.sequelize.import('../api/trip/trip.model');
db.Query = db.sequelize.import('../api/query/query.model');
db.Passenger = db.sequelize.import('../api/passenger/passenger.model');
db.Message = db.sequelize.import('../api/message/message.model');
db.Driver = db.sequelize.import('../api/driver/driver.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
