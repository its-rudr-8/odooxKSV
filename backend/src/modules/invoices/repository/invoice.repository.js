const Invoice = require("../schema/invoice.schema");

async function createInvoice(payload) {
  const invoice = new Invoice(payload);
  return invoice.save();
}

async function findInvoiceById(id) {
  return Invoice.findOne({ _id: id, isDeleted: false }).populate("purchaseOrder").populate("vendor");
}

async function updateInvoiceStatus(id, status, update = {}) {
  return Invoice.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { status, ...update } },
    { new: true },
  );
}

module.exports = { createInvoice, findInvoiceById, updateInvoiceStatus };
