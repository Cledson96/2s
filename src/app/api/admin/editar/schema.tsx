import Joi from "joi";

export const schema = Joi.object({
  id: Joi.number().required(),
  key: Joi.allow("", null),
  nome: Joi.string().required(),
  ativo: Joi.string().required(),
  administrador: Joi.string().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().allow("", null),
  pix: Joi.string().allow("", null),
  foto: Joi.string().allow("", null),
});
