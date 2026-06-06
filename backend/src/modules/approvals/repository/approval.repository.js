const Approval = require("../schema/approval.schema");

async function createApproval(payload) {
  const approval = new Approval(payload);
  return approval.save();
}

async function findApprovalById(id) {
  return Approval.findOne({ _id: id, isDeleted: false }).populate("requestedBy").populate("approver").populate("decisionBy");
}

async function updateApprovalStatus(id, status, update = {}) {
  return Approval.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { status, ...update }, $push: { history: { status, ...update } } },
    { new: true },
  );
}

module.exports = { createApproval, findApprovalById, updateApprovalStatus };
