import { Router } from 'express';
import { clientRoutes } from '../../../modules/clients/http/routes';
import { deliveryRoutes } from '../../../modules/deliveries/http/routes';
import { deliverymanRoutes } from '../../../modules/deliveryman/http/routes';

const routes = Router();

routes.use('/clients', clientRoutes);
routes.use('/deliveryman', deliverymanRoutes);
routes.use('/deliveries', deliveryRoutes);

export { routes };
