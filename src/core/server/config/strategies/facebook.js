import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { CONFIG } from '../config';
import { UserController } from '../../controllers/user.server.core.controller';

const FacebookStrategy = passportFacebook.Strategy;

export class FacebookStrategyConfig {
  static init() {
    if (CONFIG.facebook.enabled) {
      passport.use(
        new FacebookStrategy(
          {
            clientID: CONFIG.facebook.clientID,
            clientSecret: CONFIG.facebook.clientSecret,
            callbackURL: CONFIG.facebook.callbackURL,
            profileFields: ['id', 'name', 'displayName', 'emails'],
            passReqToCallback: true
          },
          (req, accessToken, refreshToken, profile, done) => {
            const providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            const providerUserProfile = {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              fullName: profile.name.displayName,
              email: profile.emails[0].value,
              username: profile.name.givenName + profile.name.familyName,
              provider: 'facebook',
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
