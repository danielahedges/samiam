import { CONFIG } from '../config/config';
import { UserController } from './user.server.core.controller';

export class IndexController {
  static render(req, res) {
    var user = null;
    if (req.user) {
      user = UserController.sanitizeUserForFrontEnd(req.user);
    }
    res.render('index', {
      title: 'Samiam',
      username: user ? user.username : null,
      user: user ? JSON.stringify(user) : null,
      auth: {
        google: CONFIG.google.enabled,
        twitter: CONFIG.twitter.enabled,
        facebook: CONFIG.facebook.enabled
      }
    });
  }
}
