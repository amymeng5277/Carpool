'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vehicleCtrlStub = {
  index: 'vehicleCtrl.index',
  show: 'vehicleCtrl.show',
  create: 'vehicleCtrl.create',
  upsert: 'vehicleCtrl.upsert',
  patch: 'vehicleCtrl.patch',
  destroy: 'vehicleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehicleIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vehicle.controller': vehicleCtrlStub
});

describe('Vehicle API Router:', function() {
  it('should return an express router instance', function() {
    expect(vehicleIndex).to.equal(routerStub);
  });

  describe('GET /api/vehicles', function() {
    it('should route to vehicle.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vehicleCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/vehicles/:id', function() {
    it('should route to vehicle.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vehicleCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/vehicles', function() {
    it('should route to vehicle.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vehicleCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/vehicles/:id', function() {
    it('should route to vehicle.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vehicleCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vehicles/:id', function() {
    it('should route to vehicle.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vehicleCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vehicles/:id', function() {
    it('should route to vehicle.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vehicleCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
