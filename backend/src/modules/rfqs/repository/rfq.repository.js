const RequestForQuotation = require("../schema/rfq.schema");

async function createRfq(payload) {
  const rfq = new RequestForQuotation(payload);
  return rfq.save();
}

async function findRfqById(id) {
  return RequestForQuotation.findOne({ _id: id, isDeleted: false })
    .populate("createdBy")
    .populate("updatedBy")
    .populate("assignedVendors");
}

async function findRfqByNumber(rfqNumber) {
  return RequestForQuotation.findOne({ rfqNumber, isDeleted: false });
}

async function countRfqs({ filter = {}, search = null } = {}) {
  const query = { isDeleted: false, ...filter };

  if (search) {
    query.$or = [
      { rfqNumber: new RegExp(search, "i") },
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { category: new RegExp(search, "i") },
      { remarks: new RegExp(search, "i") },
    ];
  }

  return RequestForQuotation.countDocuments(query);
}

async function listRfqs({ filter = {}, search = null, sort = {}, skip = 0, limit = 20 } = {}) {
  const query = { isDeleted: false, ...filter };

  if (search) {
    query.$or = [
      { rfqNumber: new RegExp(search, "i") },
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { category: new RegExp(search, "i") },
      { remarks: new RegExp(search, "i") },
    ];
  }

  return RequestForQuotation.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("createdBy")
    .populate("updatedBy")
    .populate("assignedVendors");
}

async function updateRfqById(id, payload) {
  return RequestForQuotation.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: payload },
    { new: true, runValidators: true },
  )
    .populate("createdBy")
    .populate("updatedBy")
    .populate("assignedVendors");
}

async function softDeleteRfqById(id, deletedBy) {
  const rfq = await RequestForQuotation.findOne({ _id: id, isDeleted: false });
  if (!rfq) {
    return null;
  }

  return rfq.softDelete(deletedBy);
}

async function updateRfqStatus(id, status, payload = {}) {
  return RequestForQuotation.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { status, ...payload } },
    { new: true, runValidators: true },
  )
    .populate("createdBy")
    .populate("updatedBy")
    .populate("assignedVendors");
}

async function assignRfqVendors(id, vendorIds, payload = {}) {
  return RequestForQuotation.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $addToSet: { assignedVendors: { $each: vendorIds } }, $set: payload },
    { new: true, runValidators: true },
  )
    .populate("createdBy")
    .populate("updatedBy")
    .populate("assignedVendors");
}

async function removeRfqVendors(id, vendorIds, payload = {}) {
  return RequestForQuotation.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $pull: { assignedVendors: { $in: vendorIds } }, $set: payload },
    { new: true, runValidators: true },
  )
    .populate("createdBy")
    .populate("updatedBy")
    .populate("assignedVendors");
}

module.exports = {
  createRfq,
  findRfqById,
  findRfqByNumber,
  countRfqs,
  listRfqs,
  updateRfqById,
  softDeleteRfqById,
  updateRfqStatus,
  assignRfqVendors,
  removeRfqVendors,
};