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
  }
}
