import Joi from "joi";

export const addWaterSchema = Joi.object({
  amountWater: Joi.number().max(5000).required().messages({
    "number.base": `Amount water must be number`,
    "any.required": `Amount water is required`,
  }),
  date: Joi.number().required().messages({
    "number.base": `Date must be number`,
    "any.required": `Date is required`,
  }),
});

export const updateWaterSchema = Joi.object({
  amountWater: Joi.number().max(5000).messages({
    "number.base": `Amount water must be number`,
  }),
  date: Joi.number().messages({
    "number.base": `Date must be number`,
  }),
});
