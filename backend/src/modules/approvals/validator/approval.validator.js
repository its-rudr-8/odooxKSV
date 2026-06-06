const Joi = require("joi");

const approvalSchema = Joi.object({
  approvalCode: Joi.string().trim().optional(),
  subjectType: Joi.string().valid("rfq", "quotation", "purchase_order", "invoice").required(),
  subjectId: Joi.string().required(),
  requestedBy: Joi.string().required(),
  approver: Joi.string().allow(null, ""),
  remarks: Joi.string().trim().allow(null, ""),
});

const approvalDecisionSchema = Joi.object({
  remarks: Joi.string().trim().allow(null, ""),
});

module.exports = { approvalSchema, approvalDecisionSchema };
