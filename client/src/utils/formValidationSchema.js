import Joi from "joi";

const requiredErrorMsg = "این فیلد نمیتواند خالی باشد";
const minErrorMsg = "مقدار این فیلد نمیتواند صفر باشد";
const stockSelectionErrorMsg = "لطفا نماد سهم را انتخاب کنید";

const noneZeroRequiredSchema = Joi.number().min(1).required().messages({
  "any.required": requiredErrorMsg,
  "number.min": minErrorMsg,
});

const goldCurrencySchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": requiredErrorMsg,
    "string.empty": requiredErrorMsg,
  }),
  label: Joi.string(),
  amount: noneZeroRequiredSchema,
  purchasePrice: noneZeroRequiredSchema,
  marketPrice: Joi.number(),
});

const stockSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": stockSelectionErrorMsg,
    "string.empty": stockSelectionErrorMsg,
  }),
  purchasePrice: noneZeroRequiredSchema,
  amount: noneZeroRequiredSchema,
});

const schemas = {
  goldCurrency: goldCurrencySchema,
  stock: stockSchema,
};

export default schemas;
