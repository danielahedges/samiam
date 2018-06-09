import { PartialsController } from '../controllers/partials.server.core.controller';
import { UserController } from '../controllers/user.server.core.controller';

export class PartialsRoutes {
  static init(app) {
    app.route('/views/home')
      .get(PartialsController.redirectHome);

    app.route('/views/:modulename/:viewname')
      .get(
        UserController.partialRedirectToLogin,
        UserController.partialRedirectOnProvisional,
        UserController.requiresLogin,
        PartialsController.refuseAdminModule,
        PartialsController.render
      );

    app.param('modulename', PartialsController.setModuleName);
    app.param('viewname', PartialsController.setViewName);
  }
}
