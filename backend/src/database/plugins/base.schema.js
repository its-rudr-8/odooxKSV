const mongoose = require('mongoose');

function createBaseSchema(fields = {}) {
  return new mongoose.Schema(fields, {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  });
}

module.exports = { createBaseSchema };
