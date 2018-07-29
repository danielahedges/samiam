import express from 'express';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import connectFlash from 'connect-flash';
import { IndexRoutes } from '../routes/index.server.core.routes';
import { UserRoutes } from '../routes/user.server.core.routes';
import { PartialsRoutes } from '../routes/partials.server.core.routes';
import { PublicRoutes } from '../routes/public.server.core.routes';
import { ApiRoutes } from '../routes/api.server.routes.js';
import { moduleList } from '../../../modules';
import { CONFIG } from './config';
import _ from 'lodash';

export function init() {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: CONFIG.sessionSecret
    })
  );

  app.set('views', _.map(moduleList, module => './build/' + module + '/views'));
  app.set('view engine', 'pug');

  app.use(connectFlash());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', express.static('./public'));
  app.use('/lib', express.static('./node_modules'));

  IndexRoutes.init(app);
  UserRoutes.init(app);
  PartialsRoutes.init(app);
  PublicRoutes.init(app);
  ApiRoutes.init(app);

  return app;
}
