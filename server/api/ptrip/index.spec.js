'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ptripCtrlStub = {
  index: 'ptripCtrl.index',
  show: 'ptripCtrl.show',
  create: 'ptripCtrl.create',
  upsert: 'ptripCtrl.upsert',
  patch: 'ptripCtrl.patch',
  destroy: 'ptripCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ptripIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './ptrip.controller': ptripCtrlStub
});

describe('Ptrip API Router:', function() {
  it('should return an express router instance', function() {
    expect(ptripIndex).to.equal(routerStub);
  });

  describe('GET /api/ptrips', function() {
    it('should route to ptrip.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ptripCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/ptrips/:id', function() {
    it('should route to ptrip.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ptripCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/ptrips', function() {
    it('should route to ptrip.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ptripCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/ptrips/:id', function() {
    it('should route to ptrip.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ptripCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/ptrips/:id', function() {
    it('should route to ptrip.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ptripCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/ptrips/:id', function() {
    it('should route to ptrip.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ptripCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
