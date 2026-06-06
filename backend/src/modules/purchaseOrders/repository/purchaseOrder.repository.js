const PurchaseOrder = require("../schema/purchaseOrder.schema");

async function createPurchaseOrder(payload) {
  const purchaseOrder = new PurchaseOrder(payload);
  return purchaseOrder.save();
}

async function findPurchaseOrderById(id) {
  return PurchaseOrder.findOne({ _id: id, isDeleted: false }).populate("rfq").populate("vendor").populate("quotation").populate("approval");
}

async function updatePurchaseOrderStatus(id, status, update = {}) {
  return PurchaseOrder.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { status, ...update } },
    { new: true },
  );
}

module.exports = { createPurchaseOrder, findPurchaseOrderById, updatePurchaseOrderStatus };
