import { hash } from 'bcrypt';
import { StatusCode } from '../../../shared/enums/StatusCode';
import { applicationError } from '../../../shared/errors/applicationError';
import { Deliveryman, validateDeliveryman } from '../entities/Deliveryman';
import { IDeliverymanRepository } from '../repositories/IDeliverymanRepository';

export const createDeliverymanUseCase =
  (repository: IDeliverymanRepository) =>
  async (data: Deliveryman): Promise<Deliveryman> => {
    const { error } = validateDeliveryman(data);

    if (error) throw applicationError(error.message, StatusCode.BAD_REQUEST);

    const { username, password } = data;
    const client = await repository.findDeliverymanByName(username);

    if (client)
      throw applicationError(
        'Deliveryman already exists',
        StatusCode.BAD_REQUEST,
      );

    const hashPassword = await hash(password, 10);

    return await repository.createDeliveryman({
      username,
      password: hashPassword,
    });
  };
