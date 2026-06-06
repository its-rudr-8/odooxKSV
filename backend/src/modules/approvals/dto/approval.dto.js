function toApprovalDto(approval) {
  return {
    id: approval._id,
    approvalCode: approval.approvalCode,
    subjectType: approval.subjectType,
    subjectId: approval.subjectId,
    status: approval.status,
    decisionAt: approval.decisionAt,
  };
}

module.exports = { toApprovalDto };
