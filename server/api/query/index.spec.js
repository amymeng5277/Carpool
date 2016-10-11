'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var queryCtrlStub = {
  index: 'queryCtrl.index',
  show: 'queryCtrl.show',
  create: 'queryCtrl.create',
  upsert: 'queryCtrl.upsert',
  patch: 'queryCtrl.patch',
  destroy: 'queryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var queryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './query.controller': queryCtrlStub
});

describe('Query API Router:', function() {
  it('should return an express router instance', function() {
    expect(queryIndex).to.equal(routerStub);
  });

  describe('GET /api/querys', function() {
    it('should route to query.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'queryCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/querys/:id', function() {
    it('should route to query.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'queryCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/querys', function() {
    it('should route to query.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'queryCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/querys/:id', function() {
    it('should route to query.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'queryCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/querys/:id', function() {
    it('should route to query.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'queryCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/querys/:id', function() {
    it('should route to query.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'queryCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
