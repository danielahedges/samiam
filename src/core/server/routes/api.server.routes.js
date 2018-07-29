import { CaseController } from '../controllers/case.server.controller';
import { UserController } from '../controllers/user.server.core.controller';
import { PehService } from '../services/peh.server.services';

export class ApiRoutes {
  static init(app) {
    PehService.init();
    CaseController.init();
    app
      .route('/pehs')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('case'),
        CaseController.pehList
      )
      .post(
        UserController.requiresLogin,
        UserController.requiresRole('case'),
        CaseController.pehCreate
      );

    app
      .route('/pehs/:pehid')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('case'),
        CaseController.getPeh,
        CaseController.pehRead
      );

    app.param('pehid', CaseController.setPehid);
  }
}
