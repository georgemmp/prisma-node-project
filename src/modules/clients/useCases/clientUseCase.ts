import { IClientRepository } from '../repositories/IClientRepository';
import { createClientUseCase } from './createClientUseCase';
import { authClientUseCase } from './authClientUseCase';

export const clientUseCase = (repository: IClientRepository) => ({
  createClient: createClientUseCase(repository),
  authClient: authClientUseCase(repository),
});
