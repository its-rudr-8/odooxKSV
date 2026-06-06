const mongoose = require("mongoose");
const { ROLE_VALUES } = require("../../../config/roles.constants");
const { softDeletePlugin } = require("../../../database/plugins/softDelete.plugin");
const { auditPlugin } = require("../../../database/plugins/audit.plugin");

const refreshTokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true },
    tokenId: { type: String, required: true, index: true },
    userAgent: { type: String, default: null },
    ipAddress: { type: String, default: null },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date, default: null },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 100 },
    lastName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    phone: { type: String, trim: true, default: null },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLE_VALUES, default: "procurement_officer", index: true },
    status: { type: String, enum: ["active", "inactive", "invited", "suspended"], default: "active", index: true },
    permissions: [{ type: String, trim: true }],
    lastLoginAt: { type: Date, default: null },
    refreshTokens: { type: [refreshTokenSchema], default: [] },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1, status: 1 });
userSchema.plugin(softDeletePlugin);
userSchema.plugin(auditPlugin);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);