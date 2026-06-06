const Quotation = require("../schema/quotation.schema");

async function createQuotation(payload) {
  const quotation = new Quotation(payload);
  return quotation.save();
}

async function findQuotationById(id) {
  return Quotation.findOne({ _id: id, isDeleted: false }).populate("rfq").populate("vendor").populate("submittedBy");
}

async function updateQuotationStatus(id, status, update = {}) {
  return Quotation.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { status, ...update } },
    { new: true },
  );
}

module.exports = { createQuotation, findQuotationById, updateQuotationStatus };
