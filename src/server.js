import { init } from './core/server/config/express';
import { MongooseConfig } from './core/server/config/mongoose';
import sourceMapSupport from 'source-map-support';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

sourceMapSupport.install();
MongooseConfig.init();
export const app = init();
app.listen(3000);

console.log('Server running at http://localhost:3000/');
