import { IClientRepository } from './IClientRepository';
import { Client } from '../entities/Client';
import { prisma } from '../../../infrastructure/db/prismaClient';

export const clientRepository = (): IClientRepository => ({
  createClient: async (data: Client) => {
    return await prisma.clients.create({
      data,
    });
  },
  findClientByName: async (username: string): Promise<Client | null> => {
    return await prisma.clients.findFirst({
      where: { username: { mode: 'insensitive', equals: username } },
    });
  },
});
