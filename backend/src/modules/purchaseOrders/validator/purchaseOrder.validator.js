const Joi = require("joi");

const purchaseOrderSchema = Joi.object({
  purchaseOrderNumber: Joi.string().trim().optional(),
  rfq: Joi.string().required(),
  quotation: Joi.string().allow(null, ""),
  vendor: Joi.string().required(),
  approval: Joi.string().allow(null, ""),
  items: Joi.array().items(
    Joi.object({
      description: Joi.string().trim().required(),
      quantity: Joi.number().min(1).required(),
      unitPrice: Joi.number().min(0).required(),
      totalPrice: Joi.number().min(0).default(0),
    }),
  ).default([]),
  subtotal: Joi.number().min(0).default(0),
  taxAmount: Joi.number().min(0).default(0),
  totalAmount: Joi.number().min(0).default(0),
});

module.exports = { purchaseOrderSchema };
