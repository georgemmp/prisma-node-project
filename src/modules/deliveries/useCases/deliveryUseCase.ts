import { IDeliveryRepository } from '../repositories/IDeliveryRepository';
import { createDeliveryUseCase } from './createDeliveryUseCase';
import {
  findAllDeliveriesByClientIdUseCase,
  findAllDeliveriesByDeliverymanUseCase,
} from './findAllDeliveriesUseCase';
import {
  finishDeliveryUseCase,
  updateDeliveryOnTheWayUseCase,
} from './updateDeliveryUseCase';

export const deliveryUseCase = (repository: IDeliveryRepository) => ({
  createDelivery: createDeliveryUseCase(repository),
  findAllDeliveries: findAllDeliveriesByDeliverymanUseCase(repository),
  onTheWay: updateDeliveryOnTheWayUseCase(repository),
  finishDelivery: finishDeliveryUseCase(repository),
  findAllDeliveriesByClient: findAllDeliveriesByClientIdUseCase(repository),
});
