import { Request, Response } from 'express';
import { deliveryUseCase } from '../../useCases/deliveryUseCase';
import { deliveryRepository } from '../../repositories/deliveryRepository';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { logger } from '../../../../shared/log/logger';

const log = logger('createDeliveryController');

export const createDeliveryController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const id_client = request.user.id;
  const { item_name } = request.body;

  const useCase = deliveryUseCase(deliveryRepository());
  const { createDelivery } = useCase;
  const data = await createDelivery({ id_client, item_name });
  const { create } = responseHandler(response, data);
  log.info('Successfully created delivery '.concat(JSON.stringify(data)));
  return create();
};
