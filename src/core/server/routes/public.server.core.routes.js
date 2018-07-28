// Routes that need no authentication.

import { PublicController } from '../controllers/public.server.core.controller';

export class PublicRoutes {
  static init(app) {
    PublicController.init();

    app
      .route('/pub/:code')
      .get(PublicController.retrievePeh, PublicController.renderPeh);

    app.param('code', PublicController.setCode);
  }
}
