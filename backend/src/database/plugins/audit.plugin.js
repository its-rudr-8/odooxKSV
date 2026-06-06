const mongoose = require("mongoose");

function auditPlugin(schema) {
  schema.add({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  });
}

module.exports = { auditPlugin };