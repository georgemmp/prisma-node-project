import { IDeliverymanRepository } from '../repositories/IDeliverymanRepository';
import { authDeliverymanUseCase } from './authDeliverymanUseCase';
import { createDeliverymanUseCase } from './createDeliverymanUseCase';

export const deliverymanUseCase = (repository: IDeliverymanRepository) => ({
  createDeliveryman: createDeliverymanUseCase(repository),
  authDeliveryman: authDeliverymanUseCase(repository),
});
