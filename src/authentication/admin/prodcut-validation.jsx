import Joi from "joi";

export const productValidationSchema = Joi.object({
    category:Joi.allow(""),
    title: Joi.string().min(2).max(30).pattern(/^[A-Za-z].*$/, 'startWithLetters') .required().messages({
        'string.min': 'Title must be at least {#limit} characters long',
        'string.max': 'Title must not exceed {#limit} characters',
        'string.pattern.base': 'Title must start with letters',
        'any.required': 'Title is required',
    }),
    description: Joi.string().min(15).max(250).required().messages({
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must not exceed {#limit} characters',
        'any.required': 'Description is required',
    }),
    price: Joi.number()
        .positive()
        .max(1000)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be a positive number',
            'number.max': 'Price must not exceed 1000',
            'any.required': 'Price is required',
        }),
        calories: Joi.number()
        .positive()
        .max(4000)
        .required()
        .messages({
            'number.base': 'Calories must be a number',
            'number.positive': 'Calories must be a positive number',
            'number.max': 'Calories must not exceed 4000',
            'any.required': 'Calories are required',
        }),
        carbohydrates: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            'number.base': 'Carbohydrates must be a number',
            'number.positive': 'Carbohydrates must be a positive number',
            'number.max': 'Carbohydrates must not exceed 200',
            'any.required': 'Carbohydrates are required',
        }),
    protein: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            'number.base': 'Protein must be a number',
            'number.positive': 'Protein must be a positive number',
            'number.max': 'Protein must not exceed 200',
            'any.required': 'Protein is required',
        }),
    fat: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            'number.base': 'Fat must be a number',
            'number.positive': 'Fat must be a positive number',
            'number.max': 'Fat must not exceed 200',
            'any.required': 'Fat is required',
        }),
    imgUrl: Joi.string().min(15).max(500).required().messages({
        'string.empty': 'Image URL must not be empty',
        'any.required': 'Image URL is required',
    }),
    imgAlt: Joi.string().min(2).max(25).required().messages({
        'string.empty': 'Image Alt must not be empty',
        'any.required': 'Image Alt is required',
    }),
    sale: Joi.boolean().allow(""),
    unit: Joi.allow(""),

}).options({ allowUnknown: true });//prevent createdTime,id and other fields in edit to be validate

export const editProductValidationSchema = Joi.object({
    title: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Title must be at least {#limit} characters long',
      'string.max': 'Title must not exceed {#limit} characters',
      'any.required': 'Title is required',
    }),
    description: Joi.string().min(15).max(250).required().messages({
      'string.min': 'Description must be at least {#limit} characters long',
      'string.max': 'Description must not exceed {#limit} characters',
      'any.required': 'Description is required',
    }),
    price: Joi.number()
        .positive()
        .max(1000)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be a positive number',
            'number.max': 'Price must not exceed 1000',
            'any.required': 'Price is required',
        }),
    nutritionalValue: Joi.object({
        calories: Joi.number()
        .positive()
        .max(4000)
        .required()
        .messages({
            'number.base': 'Calories must be a number',
            'number.positive': 'Calories must be a positive number',
            'number.max': 'Calories must not exceed 4000',
            'any.required': 'Calories are required',
        }),
        carbohydrates: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            'number.base': 'Carbohydrates must be a number',
            'number.positive': 'Carbohydrates must be a positive number',
            'number.max': 'Carbohydrates must not exceed 200',
            'any.required': 'Carbohydrates are required',
        }),
        protein: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            'number.base': 'Protein must be a number',
            'number.positive': 'Protein must be a positive number',
            'number.max': 'Protein must not exceed 200',
            'any.required': 'Protein is required',
        }),
        fat: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            'number.base': 'Fat must be a number',
            'number.positive': 'Fat must be a positive number',
            'number.max': 'Fat must not exceed 200',
            'any.required': 'Fat is required',
        }),
    }).required(),
    img: Joi.object({
        url: Joi.string().min(15).max(500).required().messages({
            'string.empty': 'Image URL must not be empty',
            'any.required': 'Image URL is required',
        }),
        alt: Joi.string().min(2).max(25).required().messages({
            'string.empty': 'Image Alt must not be empty',
            'any.required': 'Image Alt is required',
        }),
    }).required(),
    sale: Joi.boolean().allow(null),
    unit: Joi.allow("", null),
    createdTime: Joi.allow("", null), 
    favorite: Joi.allow("", null),
    finalPrice: Joi.allow("", null),
    __v: Joi.allow("", null),
    _id: Joi.allow("", null),
  }).options({ stripUnknown: true });