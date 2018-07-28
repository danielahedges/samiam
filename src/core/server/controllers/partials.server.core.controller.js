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
      const mapping = {
        admin: '/views/core/adminHome',
        audit: '/views/core/auditHome',
        case: '/views/core/caseHome',
        peh: '/views/core/pehHome',
        service: '/views/core/serviceHome'
      };
      if (req.user.role && mapping[req.user.role]) {
        return res.redirect(mapping[req.user.role]);
      } else {
        console.log('Error! Unrecognized role');  // eslint-disable-line no-console
        return res.render('core_empty', {});
      }
    }
  }
}
