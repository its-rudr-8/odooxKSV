const mongoose = require("mongoose");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");

const notificationSchema = new mongoose.Schema(
  {
    recipientType: { type: String, enum: ["user", "vendor"], required: true, index: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, refPath: "recipientModel" },
    recipientModel: { type: String, enum: ["User", "Vendor"], required: true },
    type: { type: String, required: true, trim: true, index: true },
    channel: { type: [String], default: ["in_app"], enum: ["in_app", "email"] },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    readAt: { type: Date, default: null },
    sentAt: { type: Date, default: null },
  },
  { timestamps: true },
);

notificationSchema.index({ recipient: 1, readAt: 1 });
notificationSchema.plugin(softDeletePlugin);
notificationSchema.plugin(auditPlugin);

module.exports = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);