import { Delivery } from '../entities/Delivery';
import { IDeliveryRepository } from './IDeliveryRepository';
import { prisma } from '../../../infrastructure/db/prismaClient';
import { DeliveryUpdate } from '../entities/DeliveryUpdate';

export const deliveryRepository = (): IDeliveryRepository => ({
  createDelivery: async (data: Delivery) => {
    return await prisma.deliveries.create({
      data,
    });
  },
  findClientById: async (id: string) => {
    return await prisma.clients.findUnique({
      where: {
        id,
      },
    });
  },
  findDeliveryManById: async (id: string) => {
    return await prisma.deliveryman.findUnique({
      where: {
        id,
      },
    });
  },
  findAllDeliveriesToDeliveryman: async () => {
    return await prisma.deliveries.findMany({
      where: {
        on_the_way: false,
      },
    });
  },
  updateDelivery: async (id: string, data: Delivery) => {
    await prisma.deliveries.update({
      where: {
        id,
      },
      data,
    });
  },
  findDeliveryById: async (id: string) => {
    return await prisma.deliveries.findUnique({ where: { id } });
  },
  findAllDeliveriesByClientId: async (id_client: string) => {
    return await prisma.deliveries.findMany({ where: { id_client } });
  },
});
