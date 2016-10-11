'use strict';

var app = require('../..');
import request from 'supertest';

var newQuery;

describe('Query API:', function() {
  describe('GET /api/querys', function() {
    var querys;

    beforeEach(function(done) {
      request(app)
        .get('/api/querys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          querys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(querys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/querys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/querys')
        .send({
          name: 'New Query',
          info: 'This is the brand new query!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQuery = res.body;
          done();
        });
    });

    it('should respond with the newly created query', function() {
      expect(newQuery.name).to.equal('New Query');
      expect(newQuery.info).to.equal('This is the brand new query!!!');
    });
  });

  describe('GET /api/querys/:id', function() {
    var query;

    beforeEach(function(done) {
      request(app)
        .get(`/api/querys/${newQuery._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          query = res.body;
          done();
        });
    });

    afterEach(function() {
      query = {};
    });

    it('should respond with the requested query', function() {
      expect(query.name).to.equal('New Query');
      expect(query.info).to.equal('This is the brand new query!!!');
    });
  });

  describe('PUT /api/querys/:id', function() {
    var updatedQuery;

    beforeEach(function(done) {
      request(app)
        .put(`/api/querys/${newQuery._id}`)
        .send({
          name: 'Updated Query',
          info: 'This is the updated query!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQuery = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuery = {};
    });

    it('should respond with the original query', function() {
      expect(updatedQuery.name).to.equal('New Query');
      expect(updatedQuery.info).to.equal('This is the brand new query!!!');
    });

    it('should respond with the updated query on a subsequent GET', function(done) {
      request(app)
        .get(`/api/querys/${newQuery._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let query = res.body;

          expect(query.name).to.equal('Updated Query');
          expect(query.info).to.equal('This is the updated query!!!');

          done();
        });
    });
  });

  describe('PATCH /api/querys/:id', function() {
    var patchedQuery;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/querys/${newQuery._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Query' },
          { op: 'replace', path: '/info', value: 'This is the patched query!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQuery = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQuery = {};
    });

    it('should respond with the patched query', function() {
      expect(patchedQuery.name).to.equal('Patched Query');
      expect(patchedQuery.info).to.equal('This is the patched query!!!');
    });
  });

  describe('DELETE /api/querys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/querys/${newQuery._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when query does not exist', function(done) {
      request(app)
        .delete(`/api/querys/${newQuery._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
