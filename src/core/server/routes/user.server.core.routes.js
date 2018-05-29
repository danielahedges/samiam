import passport from 'passport';
import { UserController } from '../controllers/user.server.core.controller';

export class UserRoutes {
  static init(app) {
    UserController.init();
    app
      .route('/signup')
      .get(UserController.renderSignup)
      .post(UserController.signup);
    app
      .route('/signin')
      .get(UserController.renderSignIn)
      .post(
        passport.authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/signin',
          failureFlash: true
        })
      );
    app.get('/signout', UserController.signout);
    app.get(
      '/oauth/facebook',
      passport.authenticate('facebook', {
        failureRedirect: '/signin'
      })
    );
    app.get(
      '/oauth/twitter',
      passport.authenticate('twitter', {
        failureRedirect: '/signin'
      })
    );
    app.get(
      '/oauth/twitter/callback',
      passport.authenticate('twitter', {
        failureRedirect: '/signin',
        successRedirect: '/'
      })
    );
    app.get(
      '/oauth/google',
      passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      })
    );
    app.get(
      '/oauth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
      })
    );
  }
}
