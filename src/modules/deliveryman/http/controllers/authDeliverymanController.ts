import { Request, Response } from 'express';
import { logger } from '../../../../shared/log/logger';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { deliverymanRepository } from '../../repositories/deliverymanRepository';
import { deliverymanUseCase } from '../../useCases/deliverymanUseCases';

const log = logger('createDeliverymanController');

export const authDeliverymanController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { username, password } = request.body;
  const useCase = deliverymanUseCase(deliverymanRepository());
  let data = await useCase.authDeliveryman({ username, password });
  const { ok } = responseHandler(response, data);
  log.info('Deliveryman authenticated');
  return ok();
};
