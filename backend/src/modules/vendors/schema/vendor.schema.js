const mongoose = require("mongoose");
const { createBaseSchema } = require("../../../database/plugins/base.schema");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");
const { VENDOR_STATUS_VALUES } = require("../../../config/vendorStatus.constants");

const COMPANY_TYPES = ["manufacturer", "trader", "distributor", "service_provider", "wholesaler", "other"];
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PHONE_REGEX = /^[0-9+()\-\s]{7,20}$/;

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true, trim: true, maxlength: 200 },
    line2: { type: String, trim: true, default: null, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    state: { type: String, trim: true, default: null, maxlength: 120 },
    country: { type: String, required: true, trim: true, maxlength: 120 },
    postalCode: { type: String, trim: true, default: null, maxlength: 20 },
  },
  { _id: false },
);

const bankDetailsSchema = new mongoose.Schema(
  {
    accountName: { type: String, trim: true, default: null, maxlength: 150 },
    accountNumber: { type: String, trim: true, default: null, maxlength: 50 },
    bankName: { type: String, trim: true, default: null, maxlength: 150 },
    ifscCode: { type: String, trim: true, default: null, maxlength: 20 },
    branchName: { type: String, trim: true, default: null, maxlength: 150 },
  },
  { _id: false },
);

const vendorSchema = createBaseSchema(
  {
    vendorCode: { type: String, required: true, trim: true, unique: true, index: true, maxlength: 50 },
    companyName: { type: String, required: true, trim: true, maxlength: 200, index: true },
    companyType: { type: String, required: true, enum: COMPANY_TYPES, index: true },
    vendorCategory: { type: String, required: true, trim: true, maxlength: 120, index: true },
    contactPerson: { type: String, required: true, trim: true, maxlength: 150 },
    designation: { type: String, trim: true, default: null, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    phone: { type: String, required: true, trim: true, index: true, validate: { validator: (value) => PHONE_REGEX.test(value), message: "Invalid phone number" } },
    alternatePhone: { type: String, trim: true, default: null, validate: { validator: (value) => !value || PHONE_REGEX.test(value), message: "Invalid alternate phone number" } },
    website: { type: String, trim: true, default: null, maxlength: 255 },
    gstNumber: { type: String, trim: true, unique: true, sparse: true, default: null, uppercase: true, validate: { validator: (value) => !value || GST_REGEX.test(value), message: "Invalid GST number" } },
    panNumber: { type: String, trim: true, unique: true, sparse: true, default: null, uppercase: true, validate: { validator: (value) => !value || PAN_REGEX.test(value), message: "Invalid PAN number" } },
    address: { type: addressSchema, required: true },
    city: { type: String, required: true, trim: true, index: true, maxlength: 120 },
    state: { type: String, required: true, trim: true, index: true, maxlength: 120 },
    country: { type: String, required: true, trim: true, maxlength: 120 },
    postalCode: { type: String, required: true, trim: true, maxlength: 20 },
    bankDetails: { type: bankDetailsSchema, default: {} },
    paymentTerms: { type: String, trim: true, default: null, maxlength: 120 },
    rating: { type: Number, min: 0, max: 5, default: 0, index: true },
    performanceScore: { type: Number, min: 0, max: 100, default: 0, index: true },
    status: { type: String, enum: VENDOR_STATUS_VALUES, default: "pending_verification", index: true },
    isVerified: { type: Boolean, default: false, index: true },
    lastTransactionDate: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "vendors" },
);

vendorSchema.index({ companyName: "text", vendorCode: "text", vendorCategory: "text", city: "text", state: "text", email: "text" });
vendorSchema.plugin(softDeletePlugin);
vendorSchema.plugin(auditPlugin);

module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);