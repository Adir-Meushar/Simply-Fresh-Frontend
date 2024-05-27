import Joi from "joi";


export const contactSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).pattern(/^[^\d]+$/).required().messages({
        'string.min': 'First name must be at least {#limit} characters long',
        'string.max': 'First name must not exceed {#limit} characters',
        'string.pattern.base': 'First name cannot contain numeric characters',
        'any.required': 'First name is required',
      }),
      lastName: Joi.string().min(2).max(30).pattern(/^[^\d]+$/).required().messages({
        'string.min': 'Last name must be at least {#limit} characters long',
        'string.max': 'Last name must not exceed {#limit} characters',
        'string.pattern.base': 'Last name cannot contain numeric characters',
        'any.required': 'Last name is required',
      }),
      phone: Joi.string().pattern(/^[0-9]{9,13}$/).required().messages({
        'string.pattern.base': 'Phone must be numeric and between 9 to 13 digits',
        'any.required': 'Phone number is required',
      }),
      email: Joi.string().email({ tlds: false }).required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
      message:Joi.string().min(20).max(200).required().messages({
        'string.min': 'Message name must be at least {#limit} characters long',
        'string.max': 'Message name must not exceed {#limit} characters',
        'any.required': 'Message name is required',
      }),
  });
  