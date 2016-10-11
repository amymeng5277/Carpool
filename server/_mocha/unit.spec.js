'use strict';

var logger = require('tracer').console();
var request = require('supertest');
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


describe('Action API:', function () {
  describe('Test Action', function () {
    it('should do something', function (done) {
      var group_auth_svc = require('../api/group_auth/group_auth.service');
      var group_svc = require('../api/group/group.service');
      var user_svc = require('../api/user/user.service');
      var referral = {};
      referral.email = 'xue777hua9@163.com';


      return GroupCode.findAll({
        include: [{
          model: Group,
          as: 'group',
          required: false,
          include: [{
            model: GroupMember,
            required: false,
            as: 'group_members',
            attributes: ['_id'],
            where: {
              status: 'accepted'
            }
          }]
        }]
      }).then(group_codes => {
        _.each(group_codes, group_code => {
          if (group_code.group && group_code.group.group_members.length > 0) {
            group_code.setDataValue('group_member_length', group_code.group.group_members.length);
            group_code.group_member_length = group_code.group.group_members.length;
            group_code.group.setDataValue('group_members', undefined); // minimize the data packet to front-end.
            group_code.group.group_members = undefined; // minimize the data packet to front-end.
          } else {
            group_code.setDataValue('group_member_length', 0);
            group_code.group_member_length = 0;
          }
        });
        return group_codes;
      })
        .then(p => {
          logger.log(p[0]);
          done();
        });

    });
  });

})
;


