const { toRfqDto } = require("../dto/rfq.dto");

function mapRfq(rfq) {
  return toRfqDto(rfq);
}

module.exports = { mapRfq };