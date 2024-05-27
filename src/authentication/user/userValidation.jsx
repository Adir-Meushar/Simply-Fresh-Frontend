import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/).required()
    .messages({
      "string.pattern.base": "Password must meet complexity requirements",
      "any.required": "Password is required",
    }),
});

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).pattern(/^[^\d]+$/).required().messages({
    'string.min': 'Must be at least {#limit} characters long',
    'string.max': 'Must not exceed {#limit} characters',
    'string.pattern.base': 'First name cannot contain Numbers',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().min(2).max(30).pattern(/^[^\d]+$/).required().messages({
    'string.min': 'Must be at least {#limit} characters long',
    'string.max': 'Must not exceed {#limit} characters',
    'string.pattern.base': 'Last name cannot contain Numbers',
    'any.required': 'Last name is required',
  }),
  phone: Joi.string().pattern(/^[0-9]{9,13}$/).required().messages({
    'string.pattern.base': 'Requires numbers between 9 to 13 digits',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .required().min(8).max(32).pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*])/)
    .messages({
      'string.pattern.base': 'Requires: 1 digit, 1 lowercase & uppercase letter, and 1 special character.',
      'any.required': 'Password is required',
      'string.min': 'Must be at least {#limit} characters long',
      'string.max': 'Must not exceed {#limit} characters',
    }),
  city: Joi.string().min(2).max(100).required().messages({
    'string.min': 'City must be at least {#limit} characters long',
    'string.max': 'City must not exceed {#limit} characters',
  }),
  street: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Street must be at least {#limit} characters long',
    'string.max': 'Street must not exceed {#limit} characters',
  }),
  houseNumber: Joi.number().required().positive(),

});

export const updateSchema = signupSchema.keys({
  password: Joi.forbidden()
});