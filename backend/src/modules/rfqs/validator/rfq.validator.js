const Joi = require("joi");

const statusValues = ["Draft", "Open", "Closed", "Cancelled"];
const priorityValues = ["Low", "Medium", "High", "Critical"];
const objectId = Joi.string().trim().pattern(/^[0-9a-fA-F]{24}$/);

const rfqItemSchema = Joi.object({
  itemName: Joi.string().trim().max(200).required(),
  description: Joi.string().trim().max(500).allow(null, ""),
  quantity: Joi.number().min(1).required(),
  unit: Joi.string().trim().max(50).required(),
  estimatedPrice: Joi.number().min(0).default(0),
});

const rfqAttachmentSchema = Joi.object({
  fileName: Joi.string().trim().max(255).required(),
  fileUrl: Joi.string().uri().required(),
  fileType: Joi.string().trim().max(120).allow(null, ""),
  size: Joi.number().min(0).allow(null),
});

const rfqCreateSchema = Joi.object({
  title: Joi.string().trim().max(200).required(),
  description: Joi.string().trim().required(),
  category: Joi.string().trim().max(150).required(),
  priority: Joi.string().valid(...priorityValues).default("Medium"),
  budget: Joi.number().min(0).default(0),
  requiredDeliveryDate: Joi.date().required(),
  quotationDeadline: Joi.date().required(),
  status: Joi.string().valid("Draft").default("Draft"),
  items: Joi.array().items(rfqItemSchema).min(1).required(),
  assignedVendors: Joi.array().items(objectId).default([]),
  attachments: Joi.array().items(rfqAttachmentSchema).default([]),
  remarks: Joi.string().trim().allow(null, ""),
});

const rfqUpdateSchema = Joi.object({
  title: Joi.string().trim().max(200),
  description: Joi.string().trim(),
  category: Joi.string().trim().max(150),
  priority: Joi.string().valid(...priorityValues),
  budget: Joi.number().min(0),
  requiredDeliveryDate: Joi.date(),
  quotationDeadline: Joi.date(),
  items: Joi.array().items(rfqItemSchema).min(1),
  attachments: Joi.array().items(rfqAttachmentSchema),
  remarks: Joi.string().trim().allow(null, ""),
}).min(1);

const rfqAssignSchema = Joi.object({
  vendorIds: Joi.array().items(objectId).min(1).required(),
});

const rfqRemoveSchema = Joi.object({
  vendorIds: Joi.array().items(objectId).min(1).required(),
});

const rfqQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid(...statusValues).allow(""),
  priority: Joi.string().valid(...priorityValues).allow(""),
  category: Joi.string().trim().allow(""),
  createdBy: Joi.string().trim().allow(""),
  requiredDeliveryDate: Joi.date().allow(null, ""),
  quotationDeadline: Joi.date().allow(null, ""),
  sortBy: Joi.string().valid("rfqNumber", "title", "category", "priority", "budget", "status", "requiredDeliveryDate", "quotationDeadline", "createdAt", "updatedAt").default("createdAt"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

const rfqActionSchema = Joi.object({
  remarks: Joi.string().trim().allow(null, ""),
});

module.exports = { rfqCreateSchema, rfqUpdateSchema, rfqAssignSchema, rfqRemoveSchema, rfqQuerySchema, rfqActionSchema };