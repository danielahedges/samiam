import passport from 'passport';
import passportTwitter from 'passport-twitter';
import { CONFIG } from '../config';
import { UserController } from '../../controllers/user.server.core.controller';

const TwitterStrategy = passportTwitter.Strategy;

export class TwitterStrategyConfig {
  static init() {
    if (CONFIG.twitter.enabled) {
      passport.use(
        new TwitterStrategy(
          {
            consumerKey: CONFIG.twitter.clientID,
            consumerSecret: CONFIG.twitter.clientSecret,
            callbackURL: CONFIG.twitter.callbackURL,
            passReqToCallback: true
          },
          (req, token, tokenSecret, profile, done) => {
            const providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;

            const providerUserProfile = {
              fullName: profile.displayName,
              username: profile.username,
              provider: 'twitter',
              providerId: profile.id,
              providerData: providerData
            };

            UserController.saveOAuthUserProfile(req, providerUserProfile, done);
          }
        )
      );
    }
  }
}
