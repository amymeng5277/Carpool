'use strict';

import {User} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

var db = require('../../sqldb');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

function respondWith(res, statusCode) {
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/* Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAll({
    attributes: [
      '_id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({ token: token });
    })
    .catch(validationError(res));
};

exports.createBI = function(req, res) {
  return User.create(req.body)
    .then(respondWith(res, 201))
    .catch(handleError(res));
};
/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.find({
    where: {
      _id: userId
    }
  })
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.destroy({ _id: req.params.id })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({
    where: {
      _id: userId
    }
  })
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
};

exports.upsert = function(req, res) {
  
  return User.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWith(res))
    .catch(handleError(res));
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.find({
    where: {
      _id: userId
    },
    attributes: [
      '_id',
      'name',
      'fname',
      'lname',
      'gender',
      'birthM',
      'birthD',
      'birthY',
      'phone',
      'preGender',
      'preModel',
      'preSeat',
      'preBabySeat',
      'preWheelchair',
      'email',
      'role',
      'provider'
    ],
    include: [{
      model: db.Driver,
      as: 'driver'
    }]
  })
    .then(function(user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Get my trips
 */
exports.myTrips = function(req, res, next) {
  var userId = req.params.id;

  User.find({
    where: {
      _id: userId
    },
    include: [{
      model: db.Driver,
      as: 'driver',
      include: [{
        model: db.Trip,
        as: 'trips'
        }]
    },{
      model: db.Passenger,
      as: 'passenger',
      include: [{
        model: db.Trip,
        as: 'trips'
      }]
    }],
  })
    .then(function(user){
      if (!user) {
        return res.json([]);
      }

      var trips = [];
      if(user.driver != null){
        trips.push.apply(trips, user.driver.trips);
      }
      if(user.passenger != null){
        trips.push.apply(trips, user.passenger.trips);
      }
      res.json(trips);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Get my vehicles
 */
exports.myVehicles = function(req, res, next) {
  var userId = req.params.id;

  User.find({
    where: {
      _id: userId
    },
    include: [{
      model: db.Driver,
      as: 'driver',
      include: [{
        model: db.Vehicle,
        as: 'vehicles'
      }],
    }],
  })
    .then(function(user){
      if (!user || !user.driver) {
        return res.json([]);
      }

      res.json(user.driver.vehicles);
    })
    .catch(function(err) {
      return next(err);
    });
}

/**
 * Get my sub resources
 */
exports.subResource = function(req, res, next) {
  var userId = req.params.id;
  var resource = req.params.resource;
  var name2Model = {
    'messages': db.Message,
    'queries': db.Query,
  }

  if(! name2Model[resource]){
    return res.status(404).end();
  }

  User.find({
    where: {
      _id: userId
    },
    include: [{
      model: name2Model[resource],
      as: resource,
    }],
  })
    .then(function(user){
      if (!user) {
        return res.json([]);
      }

      res.json(user[resource]);
    })
    .catch(function(err) {
      return next(err);
    });
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
