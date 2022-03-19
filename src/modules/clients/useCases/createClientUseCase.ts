import { IClientRepository } from '../repositories/IClientRepository';
import { Client, validateClient } from '../entities/Client';
import { hash } from 'bcrypt';
import { applicationError } from '../../../shared/errors/applicationError';
import { StatusCode } from '../../../shared/enums/StatusCode';

export const createClientUseCase =
  (repository: IClientRepository) =>
  async (data: Client): Promise<Client> => {
    const { error } = validateClient(data);

    if (error) throw applicationError(error.message, StatusCode.BAD_REQUEST);

    const { username, password } = data;
    const client = await repository.findClientByName(username);

    if (client)
      throw applicationError('Client already exists', StatusCode.BAD_REQUEST);

    const hashPassword = await hash(password, 10);

    return await repository.createClient({ username, password: hashPassword });
  };
