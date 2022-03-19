import { Router } from 'express';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { createDeliveryController } from './controllers/createDeliveryController';
import {
  findAllDeliveriesByClientIdController,
  findAllDeliveriesController,
} from './controllers/findAllDeliveriesController';
import { finishDeliveryController } from './controllers/finishDeliveryController';
import { updateDeliveryOnTheWayController } from './controllers/updateDeliveryOnTheWayController';

const deliveryRoutes = Router();

deliveryRoutes.use(ensureAuthenticated);
deliveryRoutes.post('/', createDeliveryController);
deliveryRoutes.get('/deliveryman', findAllDeliveriesController);
deliveryRoutes.get('/client', findAllDeliveriesByClientIdController);
deliveryRoutes.patch('/:id/on-the-way', updateDeliveryOnTheWayController);
deliveryRoutes.patch('/:id/finish', finishDeliveryController);

export { deliveryRoutes };
