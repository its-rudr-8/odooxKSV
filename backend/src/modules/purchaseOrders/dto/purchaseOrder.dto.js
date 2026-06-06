function toPurchaseOrderDto(purchaseOrder) {
  return {
    id: purchaseOrder._id,
    purchaseOrderNumber: purchaseOrder.purchaseOrderNumber,
    rfq: purchaseOrder.rfq,
    vendor: purchaseOrder.vendor,
    quotation: purchaseOrder.quotation,
    status: purchaseOrder.status,
    totalAmount: purchaseOrder.totalAmount,
  };
}

module.exports = { toPurchaseOrderDto };
