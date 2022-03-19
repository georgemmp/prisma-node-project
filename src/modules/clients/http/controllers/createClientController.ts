import { Request, Response } from 'express';
import { clientUseCase } from '../../useCases/clientUseCase';
import { clientRepository } from '../../repositories/clientRepository';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { logger } from '../../../../shared/log/logger';

const log = logger('createClientController');

export const createClientController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { username, password } = request.body;
  const useCase = clientUseCase(clientRepository());
  let data = await useCase.createClient({ username, password });
  const { create } = responseHandler(response, data);
  log.info('Created client '.concat(JSON.stringify(data.username)));
  return create();
};
