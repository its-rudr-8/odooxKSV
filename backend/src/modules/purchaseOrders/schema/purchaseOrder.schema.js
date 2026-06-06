const mongoose = require("mongoose");
const { ENTITY_STATUS } = require("../../../config/constants");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");

const purchaseOrderItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
);

const purchaseOrderSchema = new mongoose.Schema(
  {
    purchaseOrderNumber: { type: String, required: true, unique: true, index: true },
    rfq: { type: mongoose.Schema.Types.ObjectId, ref: "RFQ", required: true, index: true },
    quotation: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation", default: null, index: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true, index: true },
    approval: { type: mongoose.Schema.Types.ObjectId, ref: "Approval", default: null, index: true },
    status: { type: String, enum: ENTITY_STATUS.purchaseOrder, default: "created", index: true },
    items: { type: [purchaseOrderItemSchema], default: [] },
    subtotal: { type: Number, min: 0, default: 0 },
    taxAmount: { type: Number, min: 0, default: 0 },
    totalAmount: { type: Number, min: 0, default: 0 },
    orderDate: { type: Date, default: Date.now },
    sentAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

purchaseOrderSchema.plugin(softDeletePlugin);
purchaseOrderSchema.plugin(auditPlugin);

module.exports = mongoose.models.PurchaseOrder || mongoose.model("PurchaseOrder", purchaseOrderSchema);