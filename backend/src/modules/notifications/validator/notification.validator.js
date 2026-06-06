const Joi = require("joi");

const notificationSchema = Joi.object({
  recipientType: Joi.string().valid("user", "vendor").required(),
  recipient: Joi.string().required(),
  recipientModel: Joi.string().valid("User", "Vendor").required(),
  type: Joi.string().trim().required(),
  channel: Joi.array().items(Joi.string().valid("in_app", "email")).default(["in_app"]),
  title: Joi.string().trim().required(),
  message: Joi.string().trim().required(),
  metadata: Joi.object().default({}),
});

const markReadSchema = Joi.object({});

module.exports = { notificationSchema, markReadSchema };
