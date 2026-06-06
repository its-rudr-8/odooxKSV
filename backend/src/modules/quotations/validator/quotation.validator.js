const Joi = require("joi");

const quotationSchema = Joi.object({
  quotationNumber: Joi.string().trim().optional(),
  rfq: Joi.string().required(),
  vendor: Joi.string().required(),
  submittedBy: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      description: Joi.string().trim().required(),
      quantity: Joi.number().min(1).required(),
      unitPrice: Joi.number().min(0).required(),
      totalPrice: Joi.number().min(0).default(0),
      notes: Joi.string().trim().allow(null, ""),
    }),
  ).default([]),
  subtotal: Joi.number().min(0).default(0),
  taxAmount: Joi.number().min(0).default(0),
  totalAmount: Joi.number().min(0).default(0),
  remarks: Joi.string().trim().allow(null, ""),
});

module.exports = { quotationSchema };
