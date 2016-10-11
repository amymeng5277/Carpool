/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/querys              ->  index
 * POST    /api/querys              ->  create
 * GET     /api/querys/:id          ->  show
 * PUT     /api/querys/:id          ->  upsert
 * PATCH   /api/querys/:id          ->  patch
 * DELETE  /api/querys/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Query} from '../../sqldb';

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

// Gets a list of Querys
export function index(req, res) {
  return Query.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Query from the DB
export function show(req, res) {
  return Query.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Query in the DB
export function create(req, res) {
  return Query.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Query in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Query.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Query in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Query.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Query from the DB
export function destroy(req, res) {
  return Query.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
