const { toQuotationDto } = require("../dto/quotation.dto");

function mapQuotation(quotation) {
  return toQuotationDto(quotation);
}

module.exports = { mapQuotation };
