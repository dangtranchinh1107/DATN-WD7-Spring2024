import Joi from "joi";

export const registerValid = Joi.object({
  name: Joi.string().required().min(6).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
  role: Joi.string(),
});

export const loginValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
});
