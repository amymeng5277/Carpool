'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:id/trips', auth.isAuthenticated(), controller.myTrips);
//router.get('/:id/trips', controller.myTrips);
router.get('/:id/vehicles', auth.isAuthenticated(), controller.myVehicles);
//router.get('/:id/vehicles', controller.myVehicles);
router.get('/:id/:resource', auth.isAuthenticated(), controller.subResource);
//router.get('/:id/:resource', controller.subResource);
router.get('/me', auth.isAuthenticated(), controller.me);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

router.put('/:id/basicInfo', auth.isAuthenticated(), controller.upsert); //change basic information

router.get('/:id', auth.isAuthenticated(), controller.show);
//router.get('/:id', controller.show);
router.post('/', controller.create);

router.post('/basicInfoCreat', auth.isAuthenticated(), controller.createBI); //creat basic information

module.exports = router;
