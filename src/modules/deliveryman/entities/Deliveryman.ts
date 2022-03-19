import Joi from 'joi';

export type Deliveryman = {
  id?: string;
  username: string;
  password: string;
};

const deliverymanSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateDeliveryman = (deliveryman: Deliveryman) => {
  const { value, error } = deliverymanSchema.validate(deliveryman);
  return { value, error };
};
