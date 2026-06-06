const mongoose = require("mongoose");
const { ENTITY_STATUS } = require("../../../config/constants");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder", required: true, index: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true, index: true },
    status: { type: String, enum: ENTITY_STATUS.invoice, default: "draft", index: true },
    invoiceDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true, index: true },
    generatedAt: { type: Date, default: null },
    paidAt: { type: Date, default: null },
    amount: { type: Number, required: true, min: 0 },
    taxAmount: { type: Number, min: 0, default: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    emailedAt: { type: Date, default: null },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  },
  { timestamps: true },
);

invoiceSchema.plugin(softDeletePlugin);
invoiceSchema.plugin(auditPlugin);

module.exports = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);