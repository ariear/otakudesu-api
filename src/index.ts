import { Hono } from 'hono';
import { routes } from './routes';

const app = new Hono();
routes(app);

export default app;
