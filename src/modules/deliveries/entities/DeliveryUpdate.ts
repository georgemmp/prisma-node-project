import Joi from 'joi';

export type DeliveryUpdate = {
  id_deliveryman: string;
  end_at?: Date;
  on_the_way?: boolean;
};

const deliveryUpdateSchema = Joi.object({
  id_deliveryman: Joi.string().required(),
  end_at: Joi.date(),
  on_the_way: Joi.boolean().required(),
});

export const validateDeliveryUpdate = (delivery: DeliveryUpdate) => {
  const { value, error } = deliveryUpdateSchema.validate(delivery);
  return { value, error };
};
