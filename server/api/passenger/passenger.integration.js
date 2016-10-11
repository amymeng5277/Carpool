'use strict';

var app = require('../..');
import request from 'supertest';

var newPassenger;

describe('Passenger API:', function() {
  describe('GET /api/passengers', function() {
    var passengers;

    beforeEach(function(done) {
      request(app)
        .get('/api/passengers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          passengers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(passengers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/passengers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/passengers')
        .send({
          name: 'New Passenger',
          info: 'This is the brand new passenger!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPassenger = res.body;
          done();
        });
    });

    it('should respond with the newly created passenger', function() {
      expect(newPassenger.name).to.equal('New Passenger');
      expect(newPassenger.info).to.equal('This is the brand new passenger!!!');
    });
  });

  describe('GET /api/passengers/:id', function() {
    var passenger;

    beforeEach(function(done) {
      request(app)
        .get(`/api/passengers/${newPassenger._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          passenger = res.body;
          done();
        });
    });

    afterEach(function() {
      passenger = {};
    });

    it('should respond with the requested passenger', function() {
      expect(passenger.name).to.equal('New Passenger');
      expect(passenger.info).to.equal('This is the brand new passenger!!!');
    });
  });

  describe('PUT /api/passengers/:id', function() {
    var updatedPassenger;

    beforeEach(function(done) {
      request(app)
        .put(`/api/passengers/${newPassenger._id}`)
        .send({
          name: 'Updated Passenger',
          info: 'This is the updated passenger!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPassenger = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPassenger = {};
    });

    it('should respond with the original passenger', function() {
      expect(updatedPassenger.name).to.equal('New Passenger');
      expect(updatedPassenger.info).to.equal('This is the brand new passenger!!!');
    });

    it('should respond with the updated passenger on a subsequent GET', function(done) {
      request(app)
        .get(`/api/passengers/${newPassenger._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let passenger = res.body;

          expect(passenger.name).to.equal('Updated Passenger');
          expect(passenger.info).to.equal('This is the updated passenger!!!');

          done();
        });
    });
  });

  describe('PATCH /api/passengers/:id', function() {
    var patchedPassenger;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/passengers/${newPassenger._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Passenger' },
          { op: 'replace', path: '/info', value: 'This is the patched passenger!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPassenger = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPassenger = {};
    });

    it('should respond with the patched passenger', function() {
      expect(patchedPassenger.name).to.equal('Patched Passenger');
      expect(patchedPassenger.info).to.equal('This is the patched passenger!!!');
    });
  });

  describe('DELETE /api/passengers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/passengers/${newPassenger._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when passenger does not exist', function(done) {
      request(app)
        .delete(`/api/passengers/${newPassenger._id}`)
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
