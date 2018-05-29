import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import { CONFIG } from '../config';
import { UserController } from '../../controllers/user.server.core.controller';

const GoogleStrategy = passportGoogle.Strategy;

export class GoogleStrategyConfig {
  static init() {
    if (CONFIG.google.enabled) {
      passport.use(
        new GoogleStrategy(
          {
            clientID: CONFIG.google.clientID,
            clientSecret: CONFIG.google.clientSecret,
            callbackURL: CONFIG.google.callbackURL,
            passReqToCallback: true
          },
          (req, accessToken, refreshToken, profile, done) => {
            const providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            const providerUserProfile = {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: 'google',
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
