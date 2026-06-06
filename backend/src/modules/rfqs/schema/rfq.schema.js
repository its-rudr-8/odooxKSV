const mongoose = require("mongoose");
const { createBaseSchema } = require("../../../database/plugins/base.schema");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");
const { RFQ_STATUS_VALUES } = require("../../../config/rfqStatus.constants");

const PRIORITY_VALUES = ["Low", "Medium", "High", "Critical"];

const rfqItemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, default: null, maxlength: 500 },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, trim: true, maxlength: 50 },
    estimatedPrice: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
);

const attachmentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true, trim: true, maxlength: 255 },
    fileUrl: { type: String, required: true, trim: true, maxlength: 1000 },
    fileType: { type: String, trim: true, default: null, maxlength: 120 },
    size: { type: Number, min: 0, default: null },
  },
  { _id: false },
);

const rfqSchema = createBaseSchema({
  rfqNumber: { type: String, required: true, unique: true, index: true, trim: true },
  title: { type: String, required: true, trim: true, maxlength: 200, index: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true, maxlength: 150, index: true },
  priority: { type: String, enum: PRIORITY_VALUES, default: "Medium", index: true },
  budget: { type: Number, min: 0, default: 0 },
  requiredDeliveryDate: { type: Date, required: true, index: true },
  quotationDeadline: { type: Date, required: true, index: true },
  status: { type: String, enum: RFQ_STATUS_VALUES, default: "Draft", index: true },
  items: { type: [rfqItemSchema], default: [] },
  assignedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor", index: true }],
  attachments: { type: [attachmentSchema], default: [] },
  remarks: { type: String, trim: true, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  openAt: { type: Date, default: null },
  closedAt: { type: Date, default: null },
  cancelledAt: { type: Date, default: null },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
});

rfqSchema.set("collection", "request_for_quotations");
rfqSchema.index({ status: 1, requiredDeliveryDate: 1 });
rfqSchema.index({ status: 1, quotationDeadline: 1 });
rfqSchema.index({ category: 1, priority: 1 });
rfqSchema.index({ title: "text", rfqNumber: "text", category: "text", remarks: "text", description: "text" });
rfqSchema.plugin(softDeletePlugin);
rfqSchema.plugin(auditPlugin);

module.exports = mongoose.models.RequestForQuotation || mongoose.model("RequestForQuotation", rfqSchema);