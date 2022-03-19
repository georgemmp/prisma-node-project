import { Request, Response } from 'express';
import { logger } from '../../../../shared/log/logger';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { deliveryRepository } from '../../repositories/deliveryRepository';
import { deliveryUseCase } from '../../useCases/deliveryUseCase';

const log = logger('updateDeliveryOnTheWayController');

export const finishDeliveryController = async (
  request: Request,
  response: Response,
) => {
  const id_deliveryman = request.user.id;
  const { id } = request.params;

  const { finishDelivery } = deliveryUseCase(deliveryRepository());
  const data = await finishDelivery(id, { id_deliveryman });
  const { noContent } = responseHandler(response, data);
  log.info('Delivery is on the way');
  return noContent();
};
