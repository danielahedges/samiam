import mongoose from 'mongoose';
import { CONFIG } from '../config/config';
import zxcvbn from 'zxcvbn';

function getErrorMessage(err) {
  let message = '';

  if (err.code) {
    switch (err.code) {
    case 11000:
    case 11001:
      message = 'Username already exists';
      break;
    default:
      message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
}

function getLayoutRender(req, title) {
  return {
    title,
    messages: req.flash('error') || req.flash('info'),
    auth: {
      google: CONFIG.google.enabled,
      twitter: CONFIG.twitter.enabled,
      facebook: CONFIG.facebook.enabled
    }
  };
}

var User;

export class UserController {
  static init() {
    User = mongoose.model('User');
  }
  static renderSignIn(req, res) {
    if (!req.user) {
      res.render('signin', getLayoutRender(req, 'Sign-in Form'));
    } else {
      return res.redirect('/');
    }
  }
  static renderSignup(req, res) {
    if (!req.user) {
      res.render('signup', getLayoutRender(req, 'Sign-up Form'));
    } else {
      return res.redirect('/');
    }
  }
  static signup(req, res, next) {
    if (!req.user) {
      const user = new User(req.body);
      user.provider = 'local';
      user.save(err => {
        if (err) {
          const message = getErrorMessage(err);
          req.flash('error', message);
          return res.redirect('/signup');
        }
        req.login(user, err => {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      });
    } else {
      return res.redirect('/');
    }
  }
  static signout(req, res) {
    req.logout();
    res.redirect('/');
  }
  static checkPasswordStrength(req, res) {
    let result, password = req.body.password;
    if (password == null) {
      return res.status(400).send({message: 'missing parameter'});
    }
    result = zxcvbn(password);
    return res.json({
      score: result.score,
      feedback: result.feedback
    });
  }
  static saveOAuthUserProfile(req, profile, done) {
    User.findOne(
      {
        provider: profile.provider,
        providerId: profile.providerId
      },
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          const possibleUsername =
            profile.username ||
            (profile.email ? profile.email.split('@')[0] : '');
          User.findUniqueUsername(possibleUsername, null, availableUsername => {
            const newUser = new User(profile);
            newUser.username = availableUsername;
            newUser.save(err => {
              return done(err, newUser);
            });
          });
        }
        return done(err, user);
      }
    );
  }
  static partialRedirectToLogin (req, res, next) {
    if (!req.isAuthenticated || !req.user) {
      return res.redirect('/views/core/login');
    }
    next();
  }
  static partialRedirectOnProvisional (req, res, next) {
    if (req.isAuthenticated && req.user.provisional) {
      return res.render('views/core/changePassword', {
        messages: ['MESSAGES.YOU_MUST_CHANGE_PASSWORD']
      });
    }
    next();
  }
  static requiresAdmin(req, res, next) {
    if (!req.user || !req.user.admin) {
      return res.status(403).send({
        message: 'User is not authorized'
      });
    }
    next();
  }
  static fetchTargetUser (req, res, next, id) {
    if (!id) {
      return res.status(400).send({message: 'Could not find target user'});
    }
    User.findById(id, (err, targetUser) => {
      if (err || !targetUser) {
        return res.status(400).send({message: 'Could not find target user'});
      }
      req.targetUser = targetUser;
      next();
    });
  }
  static resetPassword(req, res) {
    if (!req.user.admin || !req.targetUser || !req.body.newPassword) {
      return res.status(403).send({message: 'Unauthorized Transaction'});
    }
    req.targetUser.setPassword(req.body.newPassword, (err, targetUser) => {
      targetUser.provisional = true;
      targetUser.save(err => {
        if (err) {
          return res.status(400).send({message: getErrorMessage(err)});
        }
        return res.json({});
      });
    });
  }
  static requiresLogin(req, res, next) {
    if (!req.isAuthenticated() || req.user.lockedOut || req.user.provisional) {
      return res.status(401).send({
        message: 'User is not logged in'
      });
    }
    next();
  }
}
