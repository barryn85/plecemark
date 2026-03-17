import Joi from "joi";

export const UserSpec = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const PlacemarkSpec = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  attendance: Joi.number().required(),
});
