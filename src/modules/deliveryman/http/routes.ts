import { Router } from 'express';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { authDeliverymanController } from './controllers/authDeliverymanController';
import { createDeliverymanController } from './controllers/createDeliverymanController';

const deliverymanRoutes = Router();

deliverymanRoutes.post('/', createDeliverymanController);
deliverymanRoutes.post('/auth', authDeliverymanController);
deliverymanRoutes.use(ensureAuthenticated);

export { deliverymanRoutes };
