export class IndexController {
  static render(req, res) {
    res.render('index', {
      title: 'Hello World',
      userFullName: req.user ? req.user.fullName : ''
    });
  }
}
