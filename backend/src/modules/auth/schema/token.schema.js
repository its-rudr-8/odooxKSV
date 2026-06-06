const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenType: { type: String, enum: ['access', 'refresh'], required: true, index: true },
    userAgent: { type: String, default: null },
    ipAddress: { type: String, default: null },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

tokenSchema.index({ user: 1, tokenType: 1 });

module.exports = mongoose.models.Token || mongoose.model('Token', tokenSchema);
