import { compare } from 'bcrypt';
import { StatusCode } from '../../../shared/enums/StatusCode';
import { applicationError } from '../../../shared/errors/applicationError';
import { Client, validateClient } from '../entities/Client';
import { IClientRepository } from '../repositories/IClientRepository';
import { SECRET_JWT } from '../../../config/environments';
import { sign } from 'jsonwebtoken';
import { AuthClient } from '../entities/AuthClient';

export const authClientUseCase =
  (repository: IClientRepository) =>
  async (data: Client): Promise<AuthClient> => {
    const { error } = validateClient(data);

    if (error) throw applicationError(error.message, StatusCode.BAD_REQUEST);

    const { username, password } = data;
    const client = await repository.findClientByName(username);

    if (!client)
      throw applicationError(
        'Username or password invalid',
        StatusCode.BAD_REQUEST,
      );

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch)
      throw applicationError(
        'Username or password invalid',
        StatusCode.BAD_REQUEST,
      );

    const token = sign({ username }, `${SECRET_JWT}`, {
      subject: client.id,
      expiresIn: '1d',
    });

    return { token };
  };
