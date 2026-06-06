const Vendor = require("../schema/vendor.schema");

async function countVendors({ filter = {}, search = null } = {}) {
  const query = { isDeleted: false, ...filter };

  if (search) {
    query.$or = [
      { vendorCode: new RegExp(search, 'i') },
      { companyName: new RegExp(search, 'i') },
      { contactPerson: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { city: new RegExp(search, 'i') },
      { state: new RegExp(search, 'i') },
      { vendorCategory: new RegExp(search, 'i') },
    ];
  }

  return Vendor.countDocuments(query);
}

async function createVendor(payload) {
  const vendor = new Vendor(payload);
  return vendor.save();
}

async function findVendorById(id) {
  return Vendor.findOne({ _id: id, isDeleted: false });
}

async function findVendorByCode(vendorCode) {
  return Vendor.findOne({ vendorCode, isDeleted: false });
}

async function findVendorByEmail(email) {
  return Vendor.findOne({ email: String(email).toLowerCase(), isDeleted: false });
}

async function findVendorByOwnerUser(ownerUser) {
  return Vendor.findOne({ ownerUser, isDeleted: false });
}

async function findVendorByGst(gstNumber) {
  return Vendor.findOne({ gstNumber: String(gstNumber).toUpperCase(), isDeleted: false });
}

async function findVendorByPan(panNumber) {
  return Vendor.findOne({ panNumber: String(panNumber).toUpperCase(), isDeleted: false });
}

async function listVendors({ filter = {}, search = null, sort = {}, skip = 0, limit = 20 }) {
  const query = { isDeleted: false, ...filter };

  if (search) {
    query.$or = [
      { vendorCode: new RegExp(search, 'i') },
      { companyName: new RegExp(search, 'i') },
      { contactPerson: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { city: new RegExp(search, 'i') },
      { state: new RegExp(search, 'i') },
      { vendorCategory: new RegExp(search, 'i') },
    ];
  }

  return Vendor.find(query).sort(sort).skip(skip).limit(limit);
}

async function updateVendorById(id, payload) {
  return Vendor.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: payload }, { new: true, runValidators: true });
}

async function softDeleteVendorById(id, deletedBy) {
  const vendor = await Vendor.findOne({ _id: id, isDeleted: false });
  if (!vendor) {
    return null;
  }

  return vendor.softDelete(deletedBy);
}

async function updateVendorStatus(id, status, payload = {}) {
  return Vendor.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { status, ...payload } },
    { new: true, runValidators: true },
  );
}

async function updateVendorVerification(id, payload = {}) {
  return Vendor.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isVerified: true, status: 'Active', ...payload } },
    { new: true, runValidators: true },
  );
}

async function updateVendorPerformance(id, payload = {}) {
  return Vendor.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: payload },
    { new: true, runValidators: true },
  );
}

module.exports = {
  countVendors,
  createVendor,
  findVendorById,
  findVendorByCode,
  findVendorByEmail,
  findVendorByOwnerUser,
  findVendorByGst,
  findVendorByPan,
  listVendors,
  updateVendorById,
  softDeleteVendorById,
  updateVendorStatus,
  updateVendorVerification,
  updateVendorPerformance,
};