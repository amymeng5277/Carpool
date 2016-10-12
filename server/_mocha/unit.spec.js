'use strict';

var logger = require('tracer').console();
var request = require('supertest');
var sqldb = require('../sqldb');
var sequelize = sqldb.sequelize;
import { Promise } from 'sequelize';
import config from '../config/environment';
var _ = require('lodash');
var db = sqldb;

// Populate databases with sample data
//if (config.seedDB) {
//  require('../config/seed');
//}

//Object.keys(sqldb).forEach(function (modelName) {
//  if ("associate" in sqldb[modelName]) {
//    sqldb[modelName].associate(sqldb);
//  }
//});
sqldb.sequelize.sync();

describe('Action API:', function () {
  describe('Test Action', function () {
    it('should do something', function (done) {
      // find user -> driver
      db.User.findAll({
        include: [{
          model: db.Driver,
          as: 'driver',
          where: {
            userId: {$ne: null}
          }
        }]
      }).then(function (users) {
        _.each(users, user => {
          logger.info("driverId of this user: " + user.name + " is " + user.driver._id);
        });

        db.Driver.findAll({
          include: [{
            model: db.Vehicle,
            as: 'vehicles',
          }, {
            model: db.User,
            as: 'user'
          }]
        }).then(drivers => {
          _.each(drivers, driver=> {
            _.each(driver.vehicles, vehicle => {
              logger.info("the Driver " + driver.user.name + " has vehicles " + vehicle.maker + " " + vehicle.model);
            });
          });
        });

        setTimeout(done, 4500);
      });
    });
  });

})
;


