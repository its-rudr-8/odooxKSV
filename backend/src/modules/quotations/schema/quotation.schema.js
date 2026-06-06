const mongoose = require("mongoose");
const { ENTITY_STATUS } = require("../../../config/constants");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");

const quotationItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, min: 0, default: 0 },
    notes: { type: String, trim: true, default: null },
  },
  { _id: false },
);

const quotationSchema = new mongoose.Schema(
  {
    quotationNumber: { type: String, required: true, unique: true, index: true },
    rfq: { type: mongoose.Schema.Types.ObjectId, ref: "RFQ", required: true, index: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true, index: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    status: { type: String, enum: ENTITY_STATUS.quotation, default: "submitted", index: true },
    items: { type: [quotationItemSchema], default: [] },
    subtotal: { type: Number, min: 0, default: 0 },
    taxAmount: { type: Number, min: 0, default: 0 },
    totalAmount: { type: Number, min: 0, default: 0 },
    submittedAt: { type: Date, default: Date.now },
    selectedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null },
    remarks: { type: String, trim: true, default: null },
  },
  { timestamps: true },
);

quotationSchema.index({ rfq: 1, vendor: 1 }, { unique: true });
quotationSchema.plugin(softDeletePlugin);
quotationSchema.plugin(auditPlugin);

module.exports = mongoose.models.Quotation || mongoose.model("Quotation", quotationSchema);