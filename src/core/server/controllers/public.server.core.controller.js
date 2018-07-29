import mongoose from 'mongoose';
import { UserController } from './user.server.core.controller';

var User, DocModel;

export class PublicController {
  static init() {
    User = mongoose.model('User');
    DocModel = mongoose.model('Document');
  }
  static setCode(req, res, next, code) {
    req.code = code;
    next();
  }
  static retrievePeh(req, res, next) {
    // Take req.code, look it up in the PEH database.
    User.findOne({
      'peh.code': req.code
    })
      .exec()
      .then(user => {
        req.peh = user.peh;
        next();
      })
      .catch(() => {
        req.peh = null;
        next();
      });
  }
  static findLink(req, res, next) {
    DocModel.find(
      {
        // pehid: req.peh._id,
        status: 'Verified'
      },
      {
        filename: true
      }
    )
      .exec()
      .then(docs => {
        if (docs && docs.length) {
          req.peh.link.addr = '/documents/' + docs[0]._id;
          req.peh.link.text = docs[0].filename;
          next();
        }
      });
  }
  static renderPeh(req, res) {
    // req.peh may or may not be set.
    // If the retrieval failed, req.peh is null.
    var user = null;
    if (req.user) {
      user = UserController.sanitizeUserForFrontEnd(req.user);
    }
    res.render('public_peh', {
      title: 'Samiam',
      peh: req.peh,
      code: req.code,
      user: user ? JSON.stringify(user) : null
    });
  }
}
