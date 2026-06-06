const { toInvoiceDto } = require("../dto/invoice.dto");

function mapInvoice(invoice) {
  return toInvoiceDto(invoice);
}

module.exports = { mapInvoice };
