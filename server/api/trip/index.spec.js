'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tripCtrlStub = {
  index: 'tripCtrl.index',
  show: 'tripCtrl.show',
  create: 'tripCtrl.create',
  upsert: 'tripCtrl.upsert',
  patch: 'tripCtrl.patch',
  destroy: 'tripCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tripIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './trip.controller': tripCtrlStub
});

describe('Trip API Router:', function() {
  it('should return an express router instance', function() {
    expect(tripIndex).to.equal(routerStub);
  });

  describe('GET /api/trips', function() {
    it('should route to trip.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'tripCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/trips/:id', function() {
    it('should route to trip.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'tripCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/trips', function() {
    it('should route to trip.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'tripCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/trips/:id', function() {
    it('should route to trip.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'tripCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/trips/:id', function() {
    it('should route to trip.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'tripCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/trips/:id', function() {
    it('should route to trip.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'tripCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
