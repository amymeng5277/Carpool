/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicles              ->  index
 * POST    /api/vehicles              ->  create
 * GET     /api/vehicles/:id          ->  show
 * PUT     /api/vehicles/:id          ->  upsert
 * PATCH   /api/vehicles/:id          ->  patch
 * DELETE  /api/vehicles/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Vehicle} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Vehicles
export function index(req, res) {
  return Vehicle.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Vehicle from the DB
export function show(req, res) {
  return Vehicle.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Vehicle in the DB
export function create(req, res) {
  return Vehicle.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Vehicle in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Vehicle.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Vehicle in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Vehicle.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Vehicle from the DB
export function destroy(req, res) {
  return Vehicle.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
