import Joi from 'joi';

export type Client = {
  id?: string;
  username: string;
  password: string;
};

const clientSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateClient = (client: Client) => {
  const { value, error } = clientSchema.validate(client);
  return { value, error };
};
