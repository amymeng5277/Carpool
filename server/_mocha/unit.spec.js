'use strict';

var logger = require('tracer').console();
var request = require('supertest');
var sqldb = require('../sqldb');
var sequelize = sqldb.sequelize;
import { Promise } from 'sequelize';
var _ = require('lodash');
var db = sqldb;

//Object.keys(sqldb).forEach(function (modelName) {
//  if ("associate" in sqldb[modelName]) {
//    sqldb[modelName].associate(sqldb);
//  }
//});
sqldb.sequelize.sync();

describe('Action API:', function () {
  describe('Test Action', function () {
    it('should do something', function (done) {

      setTimeout(done, 4000);
    });
  });

})
;


