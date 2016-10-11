'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var passengerCtrlStub = {
  index: 'passengerCtrl.index',
  show: 'passengerCtrl.show',
  create: 'passengerCtrl.create',
  upsert: 'passengerCtrl.upsert',
  patch: 'passengerCtrl.patch',
  destroy: 'passengerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var passengerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './passenger.controller': passengerCtrlStub
});

describe('Passenger API Router:', function() {
  it('should return an express router instance', function() {
    expect(passengerIndex).to.equal(routerStub);
  });

  describe('GET /api/passengers', function() {
    it('should route to passenger.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'passengerCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/passengers/:id', function() {
    it('should route to passenger.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'passengerCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/passengers', function() {
    it('should route to passenger.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'passengerCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/passengers/:id', function() {
    it('should route to passenger.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'passengerCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/passengers/:id', function() {
    it('should route to passenger.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'passengerCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/passengers/:id', function() {
    it('should route to passenger.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'passengerCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
