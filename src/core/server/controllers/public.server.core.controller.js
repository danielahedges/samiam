import mongoose from 'mongoose';
import { UserController } from './user.server.core.controller';

var Peh;

export class PublicController {
  static init() {
    Peh = mongoose.model('Peh');
  }
  static setCode(req, res, next, code) {
    req.code = code;
    next();
  }
  static retrievePeh(req, res, next) {
    // Take req.code, look it up in the PEH database.
    Peh.findOne({
      code: req.code
    })
      .exec()
      .then(peh => {
        req.peh = peh;
        next();
      })
      .catch(() => {
        req.peh = null;
        next();
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
