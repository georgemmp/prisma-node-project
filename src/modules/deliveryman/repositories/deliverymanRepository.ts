import { IDeliverymanRepository } from './IDeliverymanRepository';
import { Deliveryman } from '../entities/Deliveryman';
import { prisma } from '../../../infrastructure/db/prismaClient';

export const deliverymanRepository = (): IDeliverymanRepository => ({
  createDeliveryman: async (data: Deliveryman) => {
    return await prisma.deliveryman.create({
      data,
    });
  },
  findDeliverymanByName: async (
    username: string,
  ): Promise<Deliveryman | null> => {
    return await prisma.deliveryman.findFirst({
      where: { username: { mode: 'insensitive', equals: username } },
    });
  },
});
