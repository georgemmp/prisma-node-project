import { StatusCode } from '../../../shared/enums/StatusCode';
import { applicationError } from '../../../shared/errors/applicationError';
import { Delivery, validateDelivery } from '../entities/Delivery';
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';

export const createDeliveryUseCase =
  (repository: IDeliveryRepository) =>
  async (delivery: Delivery): Promise<Delivery> => {
    const { error } = validateDelivery(delivery);

    if (error) throw applicationError(error.message, StatusCode.BAD_REQUEST);

    const { id_client } = delivery;
    const client = await repository.findClientById(id_client);

    if (!client)
      throw applicationError('Client not exists', StatusCode.NOT_FOUND);

    return await repository.createDelivery(delivery);
  };
