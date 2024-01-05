import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const changeUserSchema = Joi.object({
  username: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(8).max(48),
  oldPassword: Joi.string().min(8).max(48),
  gender: Joi.string().valid(...["male", "female"]),
  dailyNorma: Joi.number().min(0).max(15).messages({
    "number.min": "The daily water intake cannot be less than 0 liters!",
    "number.max": "The daily water intake cannot exceed 15 liters!",
  }),
});

export const userWaterRateSchema = Joi.object({
  dailyNorma: Joi.number().min(0).max(15).messages({
    "number.min": "The daily water intake cannot be less than 0 liters!",
    "number.max": "The daily water intake cannot exceed 15 liters!",
  }),
});

export const userAvatarsSchema = Joi.object({
  avatarURL: Joi.string(),
});

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

export const userForgotPasswordSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "The email is required!" }),
});
