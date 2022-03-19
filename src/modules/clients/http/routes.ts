import { Router } from 'express';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { authClientController } from './controllers/authClientController';
import { createClientController } from './controllers/createClientController';

const clientRoutes = Router();

clientRoutes.post('/', createClientController);
clientRoutes.post('/auth', authClientController);
clientRoutes.use(ensureAuthenticated);

export { clientRoutes };
