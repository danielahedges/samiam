import { init } from './core/server/config/express';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();
export const app = init();
app.listen(3000);

console.log('Server running at http://localhost:3000/');
