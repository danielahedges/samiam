const env = process.env.NODE_ENV || 'development';
export const CONFIG = require('./env/' + env + '.env.config.js');
