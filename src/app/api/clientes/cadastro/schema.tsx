import Joi from "joi";

export const schema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().allow("", null),
  telefone: Joi.string().allow("", null),
  telefone2: Joi.string().allow("", null),
});
