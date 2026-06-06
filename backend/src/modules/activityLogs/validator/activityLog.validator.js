const Joi = require("joi");

const activityLogSchema = Joi.object({
  action: Joi.string().trim().required(),
  entityType: Joi.string().trim().required(),
  entityId: Joi.string().required(),
  before: Joi.object().default({}),
  after: Joi.object().default({}),
  success: Joi.boolean().default(true),
  errorMessage: Joi.string().trim().allow(null, ""),
});

module.exports = { activityLogSchema };
