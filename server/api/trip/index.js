'use strict';

var express = require('express');
var controller = require('./trip.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.get('/:id/driver', controller.getDriver);
router.get('/:id/passengers', controller.getPassengers);
router.post('/:id/passengers', controller.addPassenger);

module.exports = router;
