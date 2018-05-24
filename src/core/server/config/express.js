import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { register } from '../routes/index.server.core.routes';
import { moduleList } from '../../../modules.js';
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

  app.set('views', _.map(moduleList, module => './src/' + module + '/views'));
  app.set('view engine', 'pug');

  register(app);
  return app;
}
