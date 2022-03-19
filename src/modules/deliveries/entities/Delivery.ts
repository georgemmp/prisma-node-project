import Joi from 'joi';

export type Delivery = {
  id?: string;
  id_client: string;
  item_name: string;
  end_at?: Date | null;
  on_the_way?: boolean;
  id_deliveryman?: string | null;
};

const deliverySchema = Joi.object({
  id_client: Joi.string().required(),
  item_name: Joi.string().required(),
});

export const validateDelivery = (delivery: Delivery) => {
  const { value, error } = deliverySchema.validate(delivery);
  return { value, error };
};
