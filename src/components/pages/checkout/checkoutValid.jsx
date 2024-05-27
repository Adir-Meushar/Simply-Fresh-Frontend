import Joi from "joi";

const futureDate = Joi.extend((joi) => ({
  type: "futureDate",
  base: joi.date(),
  messages: {
    "futureDate.base": "Date cannot be a past date.",
  },
  validate(value, helpers) {
    const currentDate = new Date();
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const selectedDateWithoutTime = new Date(value.getFullYear(), value.getMonth(), value.getDate());

    if (selectedDateWithoutTime < currentDateWithoutTime) {
      return { value, errors: helpers.error("futureDate.base") };
    }
    return value;
  },
}));

export const checkoutSchema = Joi.object({
  cardHolder: Joi.string().required().pattern(/^[A-Za-z]+$/)
    .min(2).max(20).messages({
      'any.required': 'Card owner name is required.',
      'string.empty': 'Name must not be empty.',
      'string.min': 'Owner Name Min 2 Letters.',
      'string.pattern.base': 'Name must contain only letters.',
    }),
  cardNumber: Joi.string().creditCard().length(16).required().messages({
    'any.required': 'Card number is required.',
    'string.creditCard': 'Invalid credit card number format.',
    'string.length': 'Credit card number must be exactly 16 digits.',
  }),
  cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required().messages({
    'any.required': 'CVV is required.',
    'string.length': 'CVV must be exactly 3 digits.',
    'string.pattern.base': 'CVV must contain only numeric digits.',
  }),
  expirationDate: futureDate.futureDate().required().messages({
    'any.required': 'Expiration date is required.',
    'futureDate.base': 'Expiration date cannot be a past date.',
  }),
  deliveryDate: Joi.date().required()
  .messages({
    'any.required': 'Delivery date is required.',
    'futureDate.base': 'Delivery date cannot be a past date.',
    'maxTwoMonthsFromNow.base': 'Delivery date cannot be more than 2 months in the future.',
  })
    .custom((value, helpers) => {
      const currentDate = new Date();
      const maxDeliveryDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, currentDate.getDate());
      const selectedDateWithoutTime = new Date(value.getFullYear(), value.getMonth(), value.getDate());

      if (selectedDateWithoutTime < currentDate) {
        return helpers.error("futureDate.base");
      }

      if (selectedDateWithoutTime > maxDeliveryDate) {
        return helpers.error("maxTwoMonthsFromNow.base");
      }

      return value;
    })
   
});
