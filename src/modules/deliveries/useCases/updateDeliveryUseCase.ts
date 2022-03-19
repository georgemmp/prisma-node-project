import { StatusCode } from '../../../shared/enums/StatusCode';
import { applicationError } from '../../../shared/errors/applicationError';
import { Deliveryman } from '../../deliveryman/entities/Deliveryman';
import { Delivery } from '../entities/Delivery';
import {
  DeliveryUpdate,
  validateDeliveryUpdate,
} from '../entities/DeliveryUpdate';
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';

const verifyDeliveryman = async (
  repository: IDeliveryRepository,
  id: string,
): Promise<Deliveryman> => {
  const deliveryman = await repository.findDeliveryManById(id);

  if (!deliveryman)
    throw applicationError('Unauthorized', StatusCode.UNAUTHORIZED);

  return deliveryman;
};

const verifyDelivery = async (
  repository: IDeliveryRepository,
  id: string,
): Promise<Delivery> => {
  const delivery = await repository.findDeliveryById(id);

  if (!delivery)
    throw applicationError('Delivery not found', StatusCode.NOT_FOUND);

  return delivery;
};

export const updateDeliveryOnTheWayUseCase =
  (repository: IDeliveryRepository) =>
  async (id: string, data: DeliveryUpdate): Promise<void> => {
    const deliveryman = await verifyDeliveryman(
      repository,
      data.id_deliveryman,
    );

    const { error } = validateDeliveryUpdate(data);
    if (error) throw applicationError(error.message, StatusCode.BAD_REQUEST);

    const delivery = await verifyDelivery(repository, id);

    const { end_at } = delivery;

    if (end_at)
      throw applicationError('Delivery already end', StatusCode.BAD_REQUEST);

    delivery.on_the_way = true;
    delivery.id_deliveryman = deliveryman.id;

    await repository.updateDelivery(id, delivery);
  };

export const finishDeliveryUseCase =
  (repository: IDeliveryRepository) =>
  async (id: string, data: DeliveryUpdate): Promise<void> => {
    await verifyDeliveryman(repository, data.id_deliveryman);

    const delivery = await verifyDelivery(repository, id);
    const { on_the_way, id_deliveryman } = delivery;

    if (id_deliveryman !== data.id_deliveryman)
      throw applicationError(
        'Deliveryman is not assigned to this delivery',
        StatusCode.BAD_REQUEST,
      );

    if (!on_the_way)
      throw applicationError(
        'Delivery already is not on the way',
        StatusCode.BAD_REQUEST,
      );

    delivery.end_at = new Date();

    await repository.updateDelivery(id, delivery);
  };
