/* eslint-env mocha */
import { expect } from 'chai';
import mockery from 'mockery';
import sinon from 'sinon';

var mockMongoose = {
  model: function() {
    throw new Error('mongoose.model not mocked');
  }
};

var mockConfig = {
  CONFIG: {}
};

var mockUser = {
};

var sandbox = sinon.createSandbox();

describe('user.server.core.controller', () => {
  var uut;
  before(() => {
    mockery.enable();
    mockery.registerMock('mongoose', mockMongoose);
    mockery.registerMock('../config/config', mockConfig);
    mockery.registerAllowable('../user.server.core.controller');
    uut = require('../user.server.core.controller').UserController;
  });
  after(() => {
    mockery.disable();
  });
  describe('init', () => {
    var stubs = {};
    before(() => {
      stubs.mongooseModel = sandbox.stub(mockMongoose, 'model').returns(mockUser);
    });
    after(() => {
      sandbox.restore();
    });
    it('gets model', () => {
      uut.init();
      expect(stubs.mongooseModel.calledOnce).to.eql(true);
      expect(stubs.mongooseModel.getCall(0).args).to.eql(['User']);
    });
  });
});
