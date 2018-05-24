import passport from 'passport';
import mongoose from 'mongoose';
import { LocalStrategyConfig } from './strategies/local';

export class PassportConfig {
  static init() {
    const User = mongoose.model('User');
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      User.findOne(
        {
          _id: id
        },
        '-password -salt',
        (err, user) => {
          done(err, user);
        }
      );
    });
    LocalStrategyConfig.init();
  }
}
