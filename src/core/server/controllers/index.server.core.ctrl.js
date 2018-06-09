import { CONFIG } from '../config/config';

export class IndexController {
  static render(req, res) {
    res.render('index', {
      title: 'Hello World',
      username: req.user ? req.user.username : null,
      user: req.user ? JSON.stringify(req.user) : null,
      auth: {
        google: CONFIG.google.enabled,
        twitter: CONFIG.twitter.enabled,
        facebook: CONFIG.facebook.enabled
      }
    });
  }
}
