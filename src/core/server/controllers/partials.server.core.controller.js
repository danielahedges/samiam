export class PartialsController {
  static setModuleName(req, res, next, moduleName) {
    req.moduleName = moduleName;
    next();
  }
  static setViewName(req, res, next, viewName) {
    req.viewName = viewName;
    next();
  }
  static render(req, res) {
    let filename = ''+req.moduleName+'_'+req.viewName;
    res.render(filename, {});
  }
  static partialHackLogin(req, res, next) {
    req.moduleName = 'core';
    req.viewName = 'login';
    next();
  }
  static partialHackChangePassword(req, res, next) {
    req.moduleName = 'core';
    req.viewName = 'changePassword';
    next();
  }
  static refuseAdminModule(req, res, next) {
    if (req.moduleName === 'admin') {
      // This is an attempt by a regular user to get admin privileges
      return res.status(400).send({message: 'Admin access forbidden'});
    }
    next();
  }
  static redirectHome(req, res) {
    // Find the correct home partial.
    if (!req.user) {
      return res.render('core_empty', {});
    } else if (req.user.lockedOut) {
      return res.render('core.lockedout', {});
    } else if (req.user.provisional) {
      return res.render('core.changePassword', {
        messages: ['MESSAGES.YOU_MUST_CHANGE_PASSWORD']
      });
    // } else if (req.user.role==='admin') { ...
    } else {
      res.redirect('/views/core/home');
    }
  }
}
