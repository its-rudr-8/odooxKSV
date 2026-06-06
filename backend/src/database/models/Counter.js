const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    prefix: { type: String, required: true, trim: true, uppercase: true },
    year: { type: Number, required: true },
    sequence: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

counterSchema.index({ key: 1, year: 1 }, { unique: true });

module.exports = mongoose.models.Counter || mongoose.model("Counter", counterSchema);