import { Client } from '../entities/Client';

export interface IClientRepository {
  createClient(data: Client): Promise<Client>;
  findClientByName(username: string): Promise<Client | null>;
}
