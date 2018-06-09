/* eslint-env mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

var sandbox = sinon.createSandbox();

describe('index.server.core.ctrl', () => {
  var uut;
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
          username: 'Harold T. Pants'
        }
      },
      mockRes = {
        render: sandbox.stub()
      };
    uut.render(mockReq, mockRes);
    expect(mockRes.render.calledOnce).to.eql(true);
    expect(mockRes.render.getCall(0).args).to.eql([
      'index',
      {
        title: 'Hello World',
        username: mockReq.user.username,
        user: '{"username":"Harold T. Pants"}',
        auth: {
          google: true,
          facebook: false,
          twitter: 3
        }
      }
    ]);
  });
});
