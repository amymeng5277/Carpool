'use strict';

var app = require('../..');
import request from 'supertest';

var newTrip;

describe('Trip API:', function() {
  describe('GET /api/trips', function() {
    var trips;

    beforeEach(function(done) {
      request(app)
        .get('/api/trips')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trips = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(trips).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/trips', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trips')
        .send({
          name: 'New Trip',
          info: 'This is the brand new trip!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTrip = res.body;
          done();
        });
    });

    it('should respond with the newly created trip', function() {
      expect(newTrip.name).to.equal('New Trip');
      expect(newTrip.info).to.equal('This is the brand new trip!!!');
    });
  });

  describe('GET /api/trips/:id', function() {
    var trip;

    beforeEach(function(done) {
      request(app)
        .get(`/api/trips/${newTrip._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trip = res.body;
          done();
        });
    });

    afterEach(function() {
      trip = {};
    });

    it('should respond with the requested trip', function() {
      expect(trip.name).to.equal('New Trip');
      expect(trip.info).to.equal('This is the brand new trip!!!');
    });
  });

  describe('PUT /api/trips/:id', function() {
    var updatedTrip;

    beforeEach(function(done) {
      request(app)
        .put(`/api/trips/${newTrip._id}`)
        .send({
          name: 'Updated Trip',
          info: 'This is the updated trip!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTrip = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrip = {};
    });

    it('should respond with the original trip', function() {
      expect(updatedTrip.name).to.equal('New Trip');
      expect(updatedTrip.info).to.equal('This is the brand new trip!!!');
    });

    it('should respond with the updated trip on a subsequent GET', function(done) {
      request(app)
        .get(`/api/trips/${newTrip._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let trip = res.body;

          expect(trip.name).to.equal('Updated Trip');
          expect(trip.info).to.equal('This is the updated trip!!!');

          done();
        });
    });
  });

  describe('PATCH /api/trips/:id', function() {
    var patchedTrip;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/trips/${newTrip._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Trip' },
          { op: 'replace', path: '/info', value: 'This is the patched trip!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTrip = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTrip = {};
    });

    it('should respond with the patched trip', function() {
      expect(patchedTrip.name).to.equal('Patched Trip');
      expect(patchedTrip.info).to.equal('This is the patched trip!!!');
    });
  });

  describe('DELETE /api/trips/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/trips/${newTrip._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trip does not exist', function(done) {
      request(app)
        .delete(`/api/trips/${newTrip._id}`)
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
