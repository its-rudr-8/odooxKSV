const mongoose = require("mongoose");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");

const activityLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    actorRole: { type: String, trim: true, default: null, index: true },
    action: { type: String, required: true, trim: true, index: true },
    entityType: { type: String, required: true, trim: true, index: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    before: { type: mongoose.Schema.Types.Mixed, default: {} },
    after: { type: mongoose.Schema.Types.Mixed, default: {} },
    success: { type: Boolean, default: true, index: true },
    errorMessage: { type: String, default: null },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
  },
  { timestamps: true },
);

activityLogSchema.plugin(softDeletePlugin);

module.exports = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);