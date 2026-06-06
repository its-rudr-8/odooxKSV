function toQuotationDto(quotation) {
  return {
    id: quotation._id,
    quotationNumber: quotation.quotationNumber,
    rfq: quotation.rfq,
    vendor: quotation.vendor,
    status: quotation.status,
    totalAmount: quotation.totalAmount,
    submittedAt: quotation.submittedAt,
  };
}

module.exports = { toQuotationDto };
