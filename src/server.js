import { init } from './core/server/config/express';
import { MongooseConfig } from './core/server/config/mongoose';
import { PassportConfig } from './core/server/config/passport';
import sourceMapSupport from 'source-map-support';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

sourceMapSupport.install();
MongooseConfig.init();
export const app = init();
PassportConfig.init();
app.listen(port);

// eslint-disable-next-line no-console
console.log('Server running at http://localhost:' + port + '/');
