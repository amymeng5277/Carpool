'use strict';

import app from '../app';
import request from 'supertest';

var logger = require('tracer').console();
var sqldb = require('../sqldb');
var sequelize = sqldb.sequelize;
import { Promise } from 'sequelize';
var _ = require('lodash');
var db = sqldb;

Object.keys(sqldb).forEach(function (modelName) {
  if ("associate" in sqldb[modelName]) {
    sqldb[modelName].associate(sqldb);
  }
});


describe('HTTP API:', function() {
  var user;
  var token;

  var cleanup = function() {
    return Promise.resolve(1);
  };

  // Clear users before testing
  before(function(done) {
    return cleanup()
      .then(function() {
        user = db.User.findOne({
          where: {
            email: 'xue777hua@gmail.com'
          }
        });
      })
      .then(function() {
        request(app)
          .post('/auth/local')
          .send({
            email: 'xue777hua@gmail.com',
            password: '123456789'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            token = res.body.token;
            done();
          });
      })
  });

  // Clear users after testing
  after(cleanup);

  describe('This is a sample http test', function() {
    it('should test something based on http request', function(done) {
      request(app)
        .get('/api/users/reset_email?token=0db4a2cf-4801-47ae-acff-fcf417bc3d7c')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          logger.log(res.body);
          //done();
        });
    });

  });


});
