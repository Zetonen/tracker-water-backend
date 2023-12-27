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

export const getWaterInfoForMonthSchema = Joi.object({
 date: Joi.string().length(7).required().messages({
  "string.base": `Date must be a valid date`,
  "string.length": `Date must be in the format YYYY-MM`,
  "any.required": `Date is required.`,
 }),
});

export const getWaterInfoForMTodaySchema = Joi.object({
 date: Joi.string().length(10).required().messages({
  "string.base": `Date must be a valid date`,
  "string.length": `Date must be in the format YYYY-MM-DD`,
  "any.required": `Date is required.`,
 }),
});
