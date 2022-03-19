import 'dotenv/config';
import express, { json } from 'express';
import 'express-async-errors';

import { routes } from './infrastructure/http/routes';
import { errorMiddleware } from './shared/middlewares/errorMiddleware';
import { logMiddleware } from './shared/middlewares/logMiddleware';

const app = express();

app.use(json());
app.use(logMiddleware);
app.use(routes);
app.use(errorMiddleware);

export { app };
