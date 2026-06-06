const Joi = require("joi");

const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

const vendorCreateSchema = Joi.object({
  vendorCode: Joi.string().trim().max(50).required(),
  companyName: Joi.string().trim().max(200).required(),
  companyType: Joi.string().trim().max(100).required(),
  vendorCategory: Joi.string().trim().max(100).required(),
  contactPerson: Joi.string().trim().max(150).required(),
  designation: Joi.string().trim().max(150).required(),
  email: Joi.string().email().trim().lowercase().required(),
  phone: Joi.string().trim().pattern(phonePattern).required(),
  alternatePhone: Joi.string().trim().pattern(phonePattern).allow(null, ""),
  website: Joi.string().uri().allow(null, ""),
  gstNumber: Joi.string().trim().required(),
  panNumber: Joi.string().trim().required(),
  address: Joi.object({
    line1: Joi.string().trim().max(200).required(),
    line2: Joi.string().trim().max(200).allow(null, ""),
  }).required(),
  city: Joi.string().trim().max(120).required(),
  state: Joi.string().trim().max(120).required(),
  country: Joi.string().trim().max(120).required(),
  postalCode: Joi.string().trim().max(20).required(),
  bankDetails: Joi.object({
    accountName: Joi.string().trim().max(200).allow(null, ""),
    accountNumber: Joi.string().trim().max(50).allow(null, ""),
    bankName: Joi.string().trim().max(200).allow(null, ""),
    ifscCode: Joi.string().trim().max(20).allow(null, ""),
    branchName: Joi.string().trim().max(200).allow(null, ""),
  }).required(),
  paymentTerms: Joi.string().trim().max(100).required(),
  rating: Joi.number().min(0).max(5).default(0),
  performanceScore: Joi.number().min(0).max(100).default(0),
  status: Joi.string().valid("Active", "Inactive", "Blacklisted", "Pending Verification").default("Pending Verification"),
  isVerified: Joi.boolean().default(false),
  lastTransactionDate: Joi.date().allow(null),
  ownerUser: Joi.string().allow(null, ""),
});

const vendorUpdateSchema = Joi.object({
  vendorCode: Joi.string().trim().max(50),
  companyName: Joi.string().trim().max(200),
  companyType: Joi.string().trim().max(100),
  vendorCategory: Joi.string().trim().max(100),
  contactPerson: Joi.string().trim().max(150),
  designation: Joi.string().trim().max(150),
  email: Joi.string().email().trim().lowercase(),
  phone: Joi.string().trim().pattern(phonePattern),
  alternatePhone: Joi.string().trim().pattern(phonePattern).allow(null, ""),
  website: Joi.string().uri().allow(null, ""),
  gstNumber: Joi.string().trim(),
  panNumber: Joi.string().trim(),
  address: Joi.object({
    line1: Joi.string().trim().max(200),
    line2: Joi.string().trim().max(200).allow(null, ""),
  }),
  city: Joi.string().trim(),
  state: Joi.string().trim(),
  country: Joi.string().trim(),
  postalCode: Joi.string().trim(),
  bankDetails: Joi.object({
    accountName: Joi.string().trim().max(200).allow(null, ""),
    accountNumber: Joi.string().trim().max(50).allow(null, ""),
    bankName: Joi.string().trim().max(200).allow(null, ""),
    ifscCode: Joi.string().trim().max(20).allow(null, ""),
    branchName: Joi.string().trim().max(200).allow(null, ""),
  }),
  paymentTerms: Joi.string().trim().max(100),
  rating: Joi.number().min(0).max(5),
  performanceScore: Joi.number().min(0).max(100),
  status: Joi.string().valid("Active", "Inactive", "Blacklisted", "Pending Verification"),
  isVerified: Joi.boolean(),
  lastTransactionDate: Joi.date().allow(null),
  ownerUser: Joi.string().allow(null, ""),
}).min(1);

const vendorStatusSchema = Joi.object({
  status: Joi.string().valid("Active", "Inactive", "Blacklisted", "Pending Verification").required(),
});

const vendorQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().trim().allow(""),
  companyName: Joi.string().trim().allow(""),
  vendorCategory: Joi.string().trim().allow(""),
  city: Joi.string().trim().allow(""),
  state: Joi.string().trim().allow(""),
  status: Joi.string().valid("Active", "Inactive", "Blacklisted", "Pending Verification").allow(""),
  rating: Joi.number().min(0).max(5).allow(null),
  performanceScore: Joi.number().min(0).max(100).allow(null),
  sortBy: Joi.string().valid("companyName", "vendorCode", "rating", "performanceScore", "status", "createdAt", "updatedAt").default("createdAt"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

const vendorActionSchema = Joi.object({
  reason: Joi.string().trim().allow(null, ""),
});

module.exports = { vendorCreateSchema, vendorUpdateSchema, vendorStatusSchema, vendorQuerySchema, vendorActionSchema };
