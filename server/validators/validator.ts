// server/validators/validator.ts

import Joi from 'joi'
import  {ROLE, rolesRegistration, phoneRegex}  from '~/constants'

const regSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  surname: Joi.string().min(2).max(20),
  email: Joi.string().email().required(),
  role: Joi.string().valid(...rolesRegistration).required(),
  password: Joi.string().required().min(3).max(20),
  phone: Joi.string().required().pattern(phoneRegex),
  birthday: Joi.date().required(),
});

export const validateReg = (data: Date) => {
  return regSchema.validate(data);
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(). required(),
  role: Joi.string().valid(...Object.values(ROLE)).required(),
});

export const validateLogin = (data: Date) => {
  return loginSchema.validate(data);
};

