const { AppError } = require("../../../shared/errors/AppError");
const { nextDocumentNumber } = require("../../../shared/utils/numberGenerator");
const { ensureValidTransition } = require("../../../shared/utils/workflow");
const { createApproval, findApprovalById, updateApprovalStatus } = require("../repository/approval.repository");
const { toApprovalDto } = require("../dto/approval.dto");

const APPROVAL_TRANSITIONS = {
  pending: ["approved", "rejected"],
  approved: [],
  rejected: [],
};

async function create(payload) {
  const approvalCode = payload.approvalCode || (await nextDocumentNumber({ key: "approval", prefix: "APR" }));
  const approval = await createApproval({ ...payload, approvalCode, status: payload.status || "pending" });
  return toApprovalDto(approval);
}

async function getById(id) {
  const approval = await findApprovalById(id);
  if (!approval) {
    throw new AppError("Approval not found", 404);
  }

  return toApprovalDto(approval);
}

async function approve(id, actorId, remarks) {
  const approval = await findApprovalById(id);
  if (!approval) {
    throw new AppError("Approval not found", 404);
  }

  ensureValidTransition(approval.status, "approved", APPROVAL_TRANSITIONS, "approval");
  const updated = await updateApprovalStatus(id, "approved", { decisionBy: actorId, decisionAt: new Date(), remarks, updatedBy: actorId });
  return toApprovalDto(updated);
}

async function reject(id, actorId, remarks) {
  const approval = await findApprovalById(id);
  if (!approval) {
    throw new AppError("Approval not found", 404);
  }

  ensureValidTransition(approval.status, "rejected", APPROVAL_TRANSITIONS, "approval");
  const updated = await updateApprovalStatus(id, "rejected", { decisionBy: actorId, decisionAt: new Date(), remarks, updatedBy: actorId });
  return toApprovalDto(updated);
}

module.exports = { create, getById, approve, reject };
