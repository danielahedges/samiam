import { CONFIG } from '../config/config';

export class IndexController {
  static render(req, res) {
    const user = !req.user
      ? null
      : {
        _id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      };

    res.render('index', {
      title: 'Hello World',
      user,
      auth: {
        google: CONFIG.google.enabled,
        twitter: CONFIG.twitter.enabled,
        facebook: CONFIG.facebook.enabled
      }
    });
  }
}
