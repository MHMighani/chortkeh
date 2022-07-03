import Joi from "joi";

//lengths
const usernameMin = 5;
const usernameMax = 30;

const passwordMin = 8;
const passwordMax = 30;

// messages
const requiredErrorMsg = "این فیلد نمیتواند خالی باشد";
const minErrorMsg = "مقدار این فیلد نمیتواند صفر باشد";
const stockSelectionErrorMsg = "لطفا نماد سهم را انتخاب کنید";
const emailErrorMsg = "ایمیل وارد شده صحیح نمی‌باشد.";
const usernameLengthMsg = `طول نام کاربری باید حداقل${usernameMin} و حداکثر ${usernameMax} کاراکتر باشد.`;
const passwordLengthMsg = `طول گذرواژه باید حداقل  ${passwordMin} و حداکثر ${passwordMax} کاراکتر باشد.`;
const passwordConfirm = "گذرواژه و تایید گذرواژه با هم برابر نیستند.";
const passwordPatternMsg =
  "گذرواژه باید حداقل ۸ حرف و دارای حداقل یک عدد و یک حرف بزرگ باشد";
//common used schemas
const noneZeroRequiredSchema = Joi.number().min(1).required().messages({
  "any.required": requiredErrorMsg,
  "number.min": minErrorMsg,
});

const emailSchema = Joi.string()
  .required()
  .messages({ "string.empty": emailErrorMsg })
  .email({ tlds: { allow: false } })
  .message(emailErrorMsg);

// schemas
const goldCurrencySchema = Joi.object({
  assetSubClass: Joi.string().required().messages({
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

const cashSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": requiredErrorMsg,
    "string.empty": requiredErrorMsg,
  }),
  amount: noneZeroRequiredSchema,
});

const loginSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().messages({
    "string.empty": requiredErrorMsg,
  }),
});

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(30).required().messages({
    "string.empty": requiredErrorMsg,
    "string.min": usernameLengthMsg,
    "string.max": usernameLengthMsg,
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"))
    .required()
    .messages({
      "string.empty": requiredErrorMsg,
      "string.min": passwordLengthMsg,
      "string.max": passwordLengthMsg,
      "string.pattern.base": passwordPatternMsg,
    }),
  passwordConfirm: Joi.any().equal(Joi.ref("password")).required().messages({
    "any.only": passwordConfirm,
  }),
  email: emailSchema,
});

const schemas = {
  goldCurrency: goldCurrencySchema,
  stock: stockSchema,
  cash: cashSchema,
  login: loginSchema,
  signup: signupSchema,
};

export default schemas;
