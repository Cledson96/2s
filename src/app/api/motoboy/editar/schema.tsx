import Joi from "joi";

export const schema = Joi.object({
  id: Joi.number().required(),
  key: Joi.allow("", null),
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().allow("", null),
  cpf: Joi.string().allow("", null),
  endereco: Joi.string().allow("", null),
  pix: Joi.string().allow("", null),
});
