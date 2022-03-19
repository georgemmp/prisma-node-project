import { StatusCode } from '../../../shared/enums/StatusCode';
import { applicationError } from '../../../shared/errors/applicationError';
import { Delivery } from '../entities/Delivery';
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';

export const findAllDeliveriesByDeliverymanUseCase =
  (repository: IDeliveryRepository) =>
  async (id_deliveryman: string): Promise<Delivery[]> => {
    const deliveryman = await repository.findDeliveryManById(id_deliveryman);

    if (!deliveryman)
      throw applicationError('Unauthorized', StatusCode.UNAUTHORIZED);

    return await repository.findAllDeliveriesToDeliveryman();
  };

export const findAllDeliveriesByClientIdUseCase =
  (repository: IDeliveryRepository) =>
  async (id_client: string): Promise<Delivery[]> => {
    const client = await repository.findClientById(id_client);
    if (!client)
      throw applicationError('Unauthorized', StatusCode.UNAUTHORIZED);

    return await repository.findAllDeliveriesByClientId(id_client);
  };
