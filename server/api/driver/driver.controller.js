/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/drivers              ->  index
 * POST    /api/drivers              ->  create
 * GET     /api/drivers/:id          ->  show
 * PUT     /api/drivers/:id          ->  upsert
 * PATCH   /api/drivers/:id          ->  patch
 * DELETE  /api/drivers/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Driver} from '../../sqldb';

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

// Gets a list of Drivers
export function index(req, res) {
  return Driver.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Driver from the DB
export function show(req, res) {
  return Driver.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Driver in the DB
export function create(req, res) {
  return Driver.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Driver in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Driver.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Driver in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Driver.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Driver from the DB
export function destroy(req, res) {
  return Driver.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
