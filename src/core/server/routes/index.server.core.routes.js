import { render } from '../controllers/index.server.core.ctrl.js';

export function register(app) {
  app.get('/', render);
}
