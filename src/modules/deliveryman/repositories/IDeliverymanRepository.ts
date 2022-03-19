import { Deliveryman } from '../entities/Deliveryman';

export interface IDeliverymanRepository {
  createDeliveryman(data: Deliveryman): Promise<Deliveryman>;
  findDeliverymanByName(username: string): Promise<Deliveryman | null>;
}
