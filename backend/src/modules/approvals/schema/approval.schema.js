const mongoose = require("mongoose");
const { ENTITY_STATUS } = require("../../../config/constants");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");

const approvalSchema = new mongoose.Schema(
  {
    approvalCode: { type: String, required: true, unique: true, index: true },
    subjectType: { type: String, required: true, enum: ["rfq", "quotation", "purchase_order", "invoice"], index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    status: { type: String, enum: ENTITY_STATUS.approval, default: "pending", index: true },
    decisionBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    decisionAt: { type: Date, default: null },
    remarks: { type: String, trim: true, default: null },
    history: [
      {
        status: { type: String, enum: ENTITY_STATUS.approval },
        decidedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        decidedAt: { type: Date, default: Date.now },
        remarks: { type: String, trim: true, default: null },
      },
    ],
  },
  { timestamps: true },
);

approvalSchema.plugin(softDeletePlugin);
approvalSchema.plugin(auditPlugin);

module.exports = mongoose.models.Approval || mongoose.model("Approval", approvalSchema);