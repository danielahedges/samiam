import { UserController } from '../controllers/user.server.core.controller';

export class UserRoutes {
  static init(app) {
    UserController.init();
    app
      .route('/users')
      .post(UserController.create)
      .get(UserController.list);
  }
}
