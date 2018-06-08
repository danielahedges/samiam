import mongoose from 'mongoose';
import passport from 'passport';
// import { CONFIG } from '../config/config';

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

var User;

export class UserController {
  static init() {
    User = mongoose.model('User');
  }

  static signin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        res.status(400).send(info);
      }
      // Remove password data
      user.password = undefined;
      user.salt = undefined;

      req.login(user, err => {
        if (err) {
          res.status(400).send(err);
        }
        res.json(user);
      });
    })(req, res, next);
  }

  static signup(req, res) {
    if (!req.user) {
      const user = new User(req.body);
      user.provider = 'local';
      user.save(err => {
        if (err) {
          const message = getErrorMessage(err);
          return res.status(400).send(message);
        }
        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;

        req.login(user, err => {
          if (err) {
            return res.status(400).send(err);
          }
          return res.json(user);
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

  static saveOAuthUserProfile(req, res, profile, done) {
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
            profile.username = availableUsername;
            const newUser = new User(profile);
            newUser.save(err => {
              if (err) {
                const message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
              }
              return done(err, newUser);
            });
          });
        }
        return done(err, user);
      }
    );
  }
}
