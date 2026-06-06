const { toPurchaseOrderDto } = require("../dto/purchaseOrder.dto");

function mapPurchaseOrder(purchaseOrder) {
  return toPurchaseOrderDto(purchaseOrder);
}

module.exports = { mapPurchaseOrder };
