const mongoose = require("mongoose");

function softDeletePlugin(schema) {
  schema.add({
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  });

  schema.methods.softDelete = function softDelete(deletedBy) {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.deletedBy = deletedBy || null;
    return this.save();
  };

  schema.query.notDeleted = function notDeleted() {
    return this.where({ isDeleted: false });
  };
}

module.exports = { softDeletePlugin };