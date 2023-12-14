import Joi from "joi";

export const schema = Joi.object({
  cliente_id: Joi.number().required(),
  motoboy_id: Joi.number().required(),
  expedido: Joi.number().required(),
  insucesso: Joi.number().required(),
  data: Joi.date().required(),
});
