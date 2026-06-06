function toInvoiceDto(invoice) {
  return {
    id: invoice._id,
    invoiceNumber: invoice.invoiceNumber,
    purchaseOrder: invoice.purchaseOrder,
    vendor: invoice.vendor,
    status: invoice.status,
    totalAmount: invoice.totalAmount,
    emailStatus: invoice.emailStatus,
  };
}

module.exports = { toInvoiceDto };
