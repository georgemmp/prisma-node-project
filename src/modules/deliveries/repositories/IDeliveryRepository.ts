import { Client } from '../../clients/entities/Client';
import { Deliveryman } from '../../deliveryman/entities/Deliveryman';
import { Delivery } from '../entities/Delivery';
import { DeliveryUpdate } from '../entities/DeliveryUpdate';

export interface IDeliveryRepository {
  createDelivery(data: Delivery): Promise<Delivery>;
  findClientById(id: string): Promise<Client | null>;
  findDeliveryManById(id: string): Promise<Deliveryman | null>;
  findAllDeliveriesToDeliveryman(): Promise<Delivery[]>;
  findAllDeliveriesByClientId(id_client: string): Promise<Delivery[]>;
  updateDelivery(id: string, data: Delivery): Promise<void>;
  findDeliveryById(id: string): Promise<Delivery | null>;
}
