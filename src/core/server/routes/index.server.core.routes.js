import { IndexController } from '../controllers/index.server.core.ctrl.js';

export class IndexRoutes {
  static init(app) {
    app.get('/', IndexController.render);
  }
}
