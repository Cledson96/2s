import Joi from "joi";

export const schema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
  telefone: Joi.string().allow("", null),
  foto: Joi.string().allow("", null),
  pix: Joi.string().allow("", null),
  administrador: Joi.boolean().required(),
});
