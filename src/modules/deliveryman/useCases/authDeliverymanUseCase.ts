import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { StatusCode } from '../../../shared/enums/StatusCode';
import { applicationError } from '../../../shared/errors/applicationError';
import { AuthDeliveryman } from '../entities/AuthDeliveryman';
import { Deliveryman, validateDeliveryman } from '../entities/Deliveryman';
import { IDeliverymanRepository } from '../repositories/IDeliverymanRepository';
import { SECRET_JWT } from '../../../config/environments';

export const authDeliverymanUseCase =
  (repository: IDeliverymanRepository) =>
  async (data: Deliveryman): Promise<AuthDeliveryman> => {
    const { error } = validateDeliveryman(data);

    if (error) throw applicationError(error.message, StatusCode.BAD_REQUEST);

    const { username, password } = data;
    const deliveryman = await repository.findDeliverymanByName(username);

    if (!deliveryman)
      throw applicationError(
        'Username or password invalid',
        StatusCode.BAD_REQUEST,
      );

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch)
      throw applicationError(
        'Username or password invalid',
        StatusCode.BAD_REQUEST,
      );

    const token = sign({ username }, `${SECRET_JWT}`, {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return { token };
  };
