const { toVendorDto } = require("../dto/vendor.dto");

function mapVendor(vendor) {
  return toVendorDto(vendor);
}

module.exports = { mapVendor };