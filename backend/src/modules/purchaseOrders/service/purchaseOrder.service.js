const { AppError } = require("../../../shared/errors/AppError");
const { nextDocumentNumber } = require("../../../shared/utils/numberGenerator");
const { ensureValidTransition } = require("../../../shared/utils/workflow");
const { createPurchaseOrder, findPurchaseOrderById, updatePurchaseOrderStatus } = require("../repository/purchaseOrder.repository");
const { toPurchaseOrderDto } = require("../dto/purchaseOrder.dto");

const PO_TRANSITIONS = {
  created: ["sent", "cancelled"],
  sent: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

async function create(payload) {
  const purchaseOrderNumber = payload.purchaseOrderNumber || (await nextDocumentNumber({ key: "purchaseOrder", prefix: "PO" }));
  const purchaseOrder = await createPurchaseOrder({ ...payload, purchaseOrderNumber, status: payload.status || "created" });
  return toPurchaseOrderDto(purchaseOrder);
}

async function getById(id) {
  const purchaseOrder = await findPurchaseOrderById(id);
  if (!purchaseOrder) {
    throw new AppError("Purchase order not found", 404);
  }

  return toPurchaseOrderDto(purchaseOrder);
}

async function send(id, actorId) {
  const purchaseOrder = await findPurchaseOrderById(id);
  if (!purchaseOrder) throw new AppError("Purchase order not found", 404);
  ensureValidTransition(purchaseOrder.status, "sent", PO_TRANSITIONS, "purchase order");
  const updated = await updatePurchaseOrderStatus(id, "sent", { sentAt: new Date(), updatedBy: actorId });
  return toPurchaseOrderDto(updated);
}

async function complete(id, actorId) {
  const purchaseOrder = await findPurchaseOrderById(id);
  if (!purchaseOrder) throw new AppError("Purchase order not found", 404);
  ensureValidTransition(purchaseOrder.status, "completed", PO_TRANSITIONS, "purchase order");
  const updated = await updatePurchaseOrderStatus(id, "completed", { completedAt: new Date(), updatedBy: actorId });
  return toPurchaseOrderDto(updated);
}

async function cancel(id, actorId) {
  const purchaseOrder = await findPurchaseOrderById(id);
  if (!purchaseOrder) throw new AppError("Purchase order not found", 404);
  ensureValidTransition(purchaseOrder.status, "cancelled", PO_TRANSITIONS, "purchase order");
  const updated = await updatePurchaseOrderStatus(id, "cancelled", { updatedBy: actorId });
  return toPurchaseOrderDto(updated);
}

module.exports = { create, getById, send, complete, cancel };
