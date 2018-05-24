import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';

const LocalStrategy = passportLocal.Strategy;
const User = mongoose.model('User');

export class LocalStrategyConfig {
  static init() {
    passport.use(
      new LocalStrategy((username, password, done) => {
        User.findOne(
          {
            username: username
          },
          (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, {
                message: 'Unknown user'
              });
            }
            if (!user.authenticate(password)) {
              return done(null, false, {
                message: 'Invalid password'
              });
            }
            return done(null, user);
          }
        );
      })
    );
  }
}
