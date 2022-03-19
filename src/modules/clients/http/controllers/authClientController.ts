import { Request, Response } from 'express';
import { logger } from '../../../../shared/log/logger';
import { responseHandler } from '../../../../shared/utils/responseHandler';
import { clientRepository } from '../../repositories/clientRepository';
import { clientUseCase } from '../../useCases/clientUseCase';

const log = logger('authClientController');

export const authClientController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { username, password } = request.body;
  const useCase = clientUseCase(clientRepository());
  const data = await useCase.authClient({ username, password });
  const { ok } = responseHandler(response, data);
  log.info('Generated token');
  return ok();
};
