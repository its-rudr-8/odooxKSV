const Joi = require("joi");

const invoiceSchema = Joi.object({
  invoiceNumber: Joi.string().trim().optional(),
  purchaseOrder: Joi.string().required(),
  vendor: Joi.string().required(),
  dueDate: Joi.date().required(),
  amount: Joi.number().min(0).required(),
  taxAmount: Joi.number().min(0).default(0),
  totalAmount: Joi.number().min(0).required(),
});

const invoiceEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = { invoiceSchema, invoiceEmailSchema };
