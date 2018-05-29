import { CONFIG } from '../config/config';

export class IndexController {
  static render(req, res) {
    res.render('index', {
      title: 'Hello World',
      userFullName: req.user ? req.user.fullName : '',
      auth: {
        google: CONFIG.google.enabled,
        twitter: CONFIG.twitter.enabled,
        facebook: CONFIG.facebook.enabled
      }
    });
  }
}
