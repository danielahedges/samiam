import passport from 'passport';
import mongoose from 'mongoose';
import { LocalStrategyConfig } from './strategies/local';
import { FacebookStrategyConfig } from './strategies/facebook';
import { TwitterStrategyConfig } from './strategies/twitter';
import { GoogleStrategyConfig } from './strategies/google';

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
    FacebookStrategyConfig.init();
    TwitterStrategyConfig.init();
    GoogleStrategyConfig.init();
  }
}
