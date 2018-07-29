import { PehService } from '../services/peh.server.services';
import mongoose from 'mongoose';

var User;

export class CaseController {
  static init() {
    User = mongoose.model('User');
  }
  static setPehid(req, res, next, pehid) {
    req.pehid = pehid;
  }
  static pehList(req, res) {
    if (!req.user.clients || req.user.clients.length === 0) {
      return res.status(204).send({});
    }
    return User.find(
      {
        _id: {
          $in: req.user.clients
        }
      },
      {
        username: true,
        role: true,
        'peh.code': true,
        'peh.firstName': true,
        'peh.lastName': true,
        created: true
      }
    )
      .exec()
      .then(users => {
        res.json(users);
      });
  }
  static pehCreate(req, res) {
    return PehService.create(req.body, req.user)
      .tap(peh => {
        return User.update(
          {
            _id: req.user._id
          },
          {
            $push: {
              clients: peh._id
            }
          }
        );
      })
      .then(peh => {
        return res.json(peh);
      });
  }
  static getPeh(req, res, next) {
    return User.find(
      {
        _id: req.pehid,
        agents: req.user._id,
        role: 'peh'
      },
      {
        username: true,
        'peh.code': true,
        'peh.firstName': true,
        'peh.lastName': true,
        'peh.birthDate': true
      }
    )
      .exec()
      .then(users => {
        if (!users || users.length > 1) {
          return res.status(500).send('unknown error');
        }
        if (users.length == 0) {
          return res.status(403).send('forbidden');
        }
        req.peh = users[0];
        next();
      });
  }
  static pehRead(req, res) {
    return res.json(req.peh);
  }
}
