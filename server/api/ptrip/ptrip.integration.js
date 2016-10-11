'use strict';

var app = require('../..');
import request from 'supertest';

var newPtrip;

describe('Ptrip API:', function() {
  describe('GET /api/ptrips', function() {
    var ptrips;

    beforeEach(function(done) {
      request(app)
        .get('/api/ptrips')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ptrips = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ptrips).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/ptrips', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ptrips')
        .send({
          name: 'New Ptrip',
          info: 'This is the brand new ptrip!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPtrip = res.body;
          done();
        });
    });

    it('should respond with the newly created ptrip', function() {
      expect(newPtrip.name).to.equal('New Ptrip');
      expect(newPtrip.info).to.equal('This is the brand new ptrip!!!');
    });
  });

  describe('GET /api/ptrips/:id', function() {
    var ptrip;

    beforeEach(function(done) {
      request(app)
        .get(`/api/ptrips/${newPtrip._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ptrip = res.body;
          done();
        });
    });

    afterEach(function() {
      ptrip = {};
    });

    it('should respond with the requested ptrip', function() {
      expect(ptrip.name).to.equal('New Ptrip');
      expect(ptrip.info).to.equal('This is the brand new ptrip!!!');
    });
  });

  describe('PUT /api/ptrips/:id', function() {
    var updatedPtrip;

    beforeEach(function(done) {
      request(app)
        .put(`/api/ptrips/${newPtrip._id}`)
        .send({
          name: 'Updated Ptrip',
          info: 'This is the updated ptrip!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPtrip = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPtrip = {};
    });

    it('should respond with the original ptrip', function() {
      expect(updatedPtrip.name).to.equal('New Ptrip');
      expect(updatedPtrip.info).to.equal('This is the brand new ptrip!!!');
    });

    it('should respond with the updated ptrip on a subsequent GET', function(done) {
      request(app)
        .get(`/api/ptrips/${newPtrip._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let ptrip = res.body;

          expect(ptrip.name).to.equal('Updated Ptrip');
          expect(ptrip.info).to.equal('This is the updated ptrip!!!');

          done();
        });
    });
  });

  describe('PATCH /api/ptrips/:id', function() {
    var patchedPtrip;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/ptrips/${newPtrip._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Ptrip' },
          { op: 'replace', path: '/info', value: 'This is the patched ptrip!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPtrip = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPtrip = {};
    });

    it('should respond with the patched ptrip', function() {
      expect(patchedPtrip.name).to.equal('Patched Ptrip');
      expect(patchedPtrip.info).to.equal('This is the patched ptrip!!!');
    });
  });

  describe('DELETE /api/ptrips/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/ptrips/${newPtrip._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ptrip does not exist', function(done) {
      request(app)
        .delete(`/api/ptrips/${newPtrip._id}`)
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
