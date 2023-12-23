import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userSignupSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "The email is required!" }),
  password: Joi.string()
    .min(8)
    .max(48)
    .required()
    .messages({ "any.required": "The password is required!" }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "The email is required!" }),
  password: Joi.string()
    .min(8)
    .max(48)
    .required()
    .messages({ "any.required": "The password is required!" }),
});
