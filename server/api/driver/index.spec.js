'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var driverCtrlStub = {
  index: 'driverCtrl.index',
  show: 'driverCtrl.show',
  create: 'driverCtrl.create',
  upsert: 'driverCtrl.upsert',
  patch: 'driverCtrl.patch',
  destroy: 'driverCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var driverIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './driver.controller': driverCtrlStub
});

describe('Driver API Router:', function() {
  it('should return an express router instance', function() {
    expect(driverIndex).to.equal(routerStub);
  });

  describe('GET /api/drivers', function() {
    it('should route to driver.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'driverCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/drivers/:id', function() {
    it('should route to driver.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'driverCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/drivers', function() {
    it('should route to driver.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'driverCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/drivers/:id', function() {
    it('should route to driver.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'driverCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/drivers/:id', function() {
    it('should route to driver.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'driverCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/drivers/:id', function() {
    it('should route to driver.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'driverCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
