import express from 'express';
import {register} from '../routes/index.server.core.routes';

export function init() {
	const app = express();
	register(app);
	return app;
}
