import { Request, Response } from 'express';
import { logger } from '../../../../shared/log/logger';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { deliverymanRepository } from '../../repositories/deliverymanRepository';
import { deliverymanUseCase } from '../../useCases/deliverymanUseCases';

const log = logger('createDeliverymanController');

export const createDeliverymanController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { username, password } = request.body;
  const useCase = deliverymanUseCase(deliverymanRepository());
  let data = await useCase.createDeliveryman({ username, password });
  const { create } = responseHandler(response, data);
  log.info('Created deliveryman '.concat(JSON.stringify(data.username)));
  return create();
};
