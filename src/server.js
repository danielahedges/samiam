import {init} from './core/server/config/express';

export const app = init();
app.listen(3000);

console.log('Server running at http://localhost:3000/');
