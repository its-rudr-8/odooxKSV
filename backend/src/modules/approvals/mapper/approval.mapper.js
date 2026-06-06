const { toApprovalDto } = require("../dto/approval.dto");

function mapApproval(approval) {
  return toApprovalDto(approval);
}

module.exports = { mapApproval };
