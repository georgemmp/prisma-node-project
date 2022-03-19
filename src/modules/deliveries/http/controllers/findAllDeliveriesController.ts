import { Request, Response } from 'express';
import { logger } from '../../../../shared/log/logger';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { deliveryRepository } from '../../repositories/deliveryRepository';
import { deliveryUseCase } from '../../useCases/deliveryUseCase';

const log = logger('findAllDeliveriesController');

export const findAllDeliveriesController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const id_deliveryman = request.user.id;

  const useCase = deliveryUseCase(deliveryRepository());
  const { findAllDeliveries } = useCase;
  const data = await findAllDeliveries(id_deliveryman);
  const { ok } = responseHandler(response, data);
  log.info('Deliveries have been listed');
  return ok();
};

export const findAllDeliveriesByClientIdController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const id_client = request.user.id;

  const useCase = deliveryUseCase(deliveryRepository());
  const { findAllDeliveriesByClient } = useCase;
  const data = await findAllDeliveriesByClient(id_client);
  const { ok } = responseHandler(response, data);
  log.info('Deliveries have been listed');
  return ok();
};
