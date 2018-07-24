/* eslint-env mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

var sandbox = sinon.createSandbox();

describe('index.server.core.ctrl', () => {
  var uut, MockUserController;
  before(() => {
    mockery.registerAllowable('../index.server.core.ctrl');
    mockery.registerMock('../config/config', {
      CONFIG: {
        google: {
          enabled: true
        },
        facebook: {
          enabled: false
        },
        twitter: {
          enabled: 3
        }
      }
    });
    MockUserController = {
      sanitizeUserForFrontEnd: function() {
        throw new Error('sanitizeUserForFrontEnd not mocked');
      }
    };
    mockery.registerMock('./user.server.core.controller', {
      UserController: MockUserController
    });
    mockery.enable();
    uut = require('../index.server.core.ctrl').IndexController;
  });
  after(() => {
    mockery.deregisterAll();
    mockery.disable();
    sandbox.restore();
  });
  it('render index', () => {
    const mockReq = {
        user: {
          _id: 'my-id',
          username: 'Harold T. Pants',
          otherPrivateStuff: 'undies'
        }
      },
      mockRes = {
        render: sandbox.stub()
      };
    const mockSanitizedUser = {
      _id: 'my-id',
      username: 'Harold T. Pants'
    };
    sinon
      .stub(MockUserController, 'sanitizeUserForFrontEnd')
      .returns(mockSanitizedUser);
    uut.render(mockReq, mockRes);
    expect(MockUserController.sanitizeUserForFrontEnd.calledOnce).to.eql(true);
    expect(MockUserController.sanitizeUserForFrontEnd.getCall(0).args).to.eql([
      mockReq.user
    ]);
    expect(mockRes.render.calledOnce).to.eql(true);
    expect(mockRes.render.getCall(0).args).to.eql([
      'index',
      {
        title: 'Samiam',
        username: mockReq.user.username,
        user: '{"_id":"my-id","username":"Harold T. Pants"}',
        auth: {
          google: true,
          facebook: false,
          twitter: 3
        }
      }
    ]);
  });
});
