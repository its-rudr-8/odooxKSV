const { AppError } = require("../../../shared/errors/AppError");
const { getPagination, buildPaginationResponse } = require("../../../shared/utils/pagination");
const { createActivityLog } = require("../../activityLogs/repository/activityLog.repository");
const { createNotification } = require("../../notifications/repository/notification.repository");
const { logger } = require("../../../shared/utils/logger");
const { VENDOR_STATUS } = require("../../../config/vendorStatus.constants");
const repository = require("../repository/vendor.repository");

const ENTITY_TYPE = "Vendor";

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sameId(left, right) {
  if (!left || !right) {
    return false;
  }

  return String(left) === String(right);
}

function getActorId(user) {
  return user?.sub || user?._id || null;
}

function normalizeStatus(status) {
  if (!status) {
    return VENDOR_STATUS.PENDING_VERIFICATION;
  }

  const normalized = String(status).trim().toLowerCase();

  switch (normalized) {
    case "active":
      return VENDOR_STATUS.ACTIVE;
    case "inactive":
      return VENDOR_STATUS.INACTIVE;
    case "blacklisted":
      return VENDOR_STATUS.BLACKLISTED;
    case "pending verification":
      return VENDOR_STATUS.PENDING_VERIFICATION;
    default:
      throw new AppError("Invalid vendor status", 400);
  }
}

function buildFilter(query = {}) {
  const filter = {};

  if (query.companyName) {
    filter.companyName = new RegExp(escapeRegExp(query.companyName), "i");
  }

  if (query.vendorCategory) {
    filter.vendorCategory = new RegExp(escapeRegExp(query.vendorCategory), "i");
  }

  if (query.city) {
    filter.city = new RegExp(escapeRegExp(query.city), "i");
  }

  if (query.state) {
    filter.state = new RegExp(escapeRegExp(query.state), "i");
  }

  if (query.status) {
    filter.status = normalizeStatus(query.status);
  }

  if (query.rating !== undefined && query.rating !== null && query.rating !== "") {
    filter.rating = Number(query.rating);
  }

  if (query.performanceScore !== undefined && query.performanceScore !== null && query.performanceScore !== "") {
    filter.performanceScore = Number(query.performanceScore);
  }

  return filter;
}

function buildSort(query = {}) {
  const allowedSortFields = new Set(["companyName", "vendorCode", "rating", "performanceScore", "status", "createdAt", "updatedAt"]);
  const sortBy = allowedSortFields.has(query.sortBy) ? query.sortBy : "createdAt";
  const sortOrder = String(query.sortOrder).toLowerCase() === "asc" ? 1 : -1;

  return { [sortBy]: sortOrder };
}

async function ensureUniqueVendorFields({ vendorCode, email, gstNumber, panNumber, excludeId = null }) {
  if (vendorCode) {
    const existing = await repository.findVendorByCode(vendorCode);
    if (existing && !sameId(existing._id, excludeId)) {
      throw new AppError("Vendor code already exists", 409);
    }
  }

  if (email) {
    const existing = await repository.findVendorByEmail(email);
    if (existing && !sameId(existing._id, excludeId)) {
      throw new AppError("Vendor email already exists", 409);
    }
  }

  if (gstNumber) {
    const existing = await repository.findVendorByGst(gstNumber);
    if (existing && !sameId(existing._id, excludeId)) {
      throw new AppError("GST number already exists", 409);
    }
  }

  if (panNumber) {
    const existing = await repository.findVendorByPan(panNumber);
    if (existing && !sameId(existing._id, excludeId)) {
      throw new AppError("PAN number already exists", 409);
    }
  }
}

async function createActivityEvent({ actor, actorRole, action, entityId, before = {}, after = {}, success = true, errorMessage = null, source = {} }) {
  try {
    await createActivityLog({
      actor,
      actorRole,
      action,
      entityType: ENTITY_TYPE,
      entityId,
      before,
      after,
      success,
      errorMessage,
      ipAddress: source.ipAddress || null,
      userAgent: source.userAgent || null,
    });
  } catch (error) {
    logger.warn("Failed to create vendor activity log", {
      action,
      entityId: String(entityId),
      error: error.message,
    });
  }
}

async function createVendorNotification({ recipient, type, title, message, metadata = {} }) {
  if (!recipient) {
    return;
  }

  try {
    await createNotification({
      recipientType: "user",
      recipient,
      recipientModel: "User",
      type,
      channel: ["in_app"],
      title,
      message,
      metadata,
      sentAt: new Date(),
    });
  } catch (error) {
    logger.warn("Failed to create vendor notification", {
      recipient: String(recipient),
      type,
      error: error.message,
    });
  }
}

async function create(payload, user = {}) {
  await ensureUniqueVendorFields(payload);

  const vendorPayload = {
    ...payload,
    status: normalizeStatus(payload.status),
  };

  if (!vendorPayload.ownerUser && user?.role === "vendor") {
    vendorPayload.ownerUser = getActorId(user);
  }

  const vendor = await repository.createVendor(vendorPayload);

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.create",
    entityId: vendor._id,
    before: {},
    after: vendor.toObject(),
    source: user,
  });

  await createVendorNotification({
    recipient: vendor.ownerUser || getActorId(user),
    type: "vendor.created",
    title: "Vendor profile created",
    message: `${vendor.companyName} was created successfully.`,
    metadata: { vendorId: vendor._id, vendorCode: vendor.vendorCode },
  });

  return vendor;
}

async function list(query = {}) {
  const { page, limit, skip } = getPagination(query);
  const filter = buildFilter(query);
  const search = query.search ? String(query.search).trim() : null;
  const sort = buildSort(query);

  const [items, total] = await Promise.all([
    repository.listVendors({ filter, search, sort, skip, limit }),
    repository.countVendors({ filter, search }),
  ]);

  return {
    items,
    pagination: buildPaginationResponse({ page, limit, total }),
  };
}

async function getById(id, user = {}) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  if (user?.role === "vendor" && !sameId(vendor.ownerUser, getActorId(user))) {
    throw new AppError("Forbidden", 403);
  }

  return vendor;
}

async function update(id, payload, user = {}) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  if (user?.role === "vendor" && !sameId(vendor.ownerUser, getActorId(user))) {
    throw new AppError("Forbidden", 403);
  }

  await ensureUniqueVendorFields({
    vendorCode: payload.vendorCode || vendor.vendorCode,
    email: payload.email || vendor.email,
    gstNumber: payload.gstNumber || vendor.gstNumber,
    panNumber: payload.panNumber || vendor.panNumber,
    excludeId: vendor._id,
  });

  const updatedVendor = await repository.updateVendorById(id, payload);

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.update",
    entityId: vendor._id,
    before: vendor.toObject(),
    after: updatedVendor ? updatedVendor.toObject() : {},
    source: user,
  });

  await createVendorNotification({
    recipient: vendor.ownerUser || getActorId(user),
    type: "vendor.updated",
    title: "Vendor profile updated",
    message: `${vendor.companyName} was updated successfully.`,
    metadata: { vendorId: vendor._id, vendorCode: vendor.vendorCode },
  });

  return updatedVendor;
}

async function remove(id, user = {}) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  if (user?.role === "vendor" && !sameId(vendor.ownerUser, getActorId(user))) {
    throw new AppError("Forbidden", 403);
  }

  const deletedVendor = await repository.softDeleteVendorById(id, getActorId(user));

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.delete",
    entityId: vendor._id,
    before: vendor.toObject(),
    after: {},
    source: user,
  });

  await createVendorNotification({
    recipient: vendor.ownerUser || getActorId(user),
    type: "vendor.deleted",
    title: "Vendor profile deleted",
    message: `${vendor.companyName} was removed from the system.`,
    metadata: { vendorId: vendor._id, vendorCode: vendor.vendorCode },
  });

  return deletedVendor;
}

async function updateStatus(id, status, user = {}) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  const normalizedStatus = normalizeStatus(status);
  const updatedVendor = await repository.updateVendorStatus(id, normalizedStatus, {
    isVerified: normalizedStatus !== VENDOR_STATUS.BLACKLISTED ? vendor.isVerified : false,
  });

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.status.update",
    entityId: vendor._id,
    before: vendor.toObject(),
    after: updatedVendor ? updatedVendor.toObject() : {},
    source: user,
  });

  return updatedVendor;
}

async function verify(id, user = {}) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  const updatedVendor = await repository.updateVendorVerification(id, {});

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.verify",
    entityId: vendor._id,
    before: vendor.toObject(),
    after: updatedVendor ? updatedVendor.toObject() : {},
    source: user,
  });

  await createVendorNotification({
    recipient: vendor.ownerUser || getActorId(user),
    type: "vendor.verified",
    title: "Vendor verified",
    message: `${vendor.companyName} has been verified.`,
    metadata: { vendorId: vendor._id, vendorCode: vendor.vendorCode },
  });

  return updatedVendor;
}

async function blacklist(id, user = {}, reason = null) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  const updatedVendor = await repository.updateVendorStatus(id, VENDOR_STATUS.BLACKLISTED, { isVerified: false });

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.blacklist",
    entityId: vendor._id,
    before: vendor.toObject(),
    after: updatedVendor ? updatedVendor.toObject() : {},
    source: user,
  });

  await createVendorNotification({
    recipient: vendor.ownerUser || getActorId(user),
    type: "vendor.blacklisted",
    title: "Vendor blacklisted",
    message: `${vendor.companyName} was blacklisted.${reason ? ` Reason: ${reason}` : ""}`,
    metadata: { vendorId: vendor._id, vendorCode: vendor.vendorCode, reason },
  });

  return updatedVendor;
}

async function trackPerformance(id, payload = {}, user = {}) {
  const vendor = await repository.findVendorById(id);

  if (!vendor) {
    throw new AppError("Vendor not found", 404);
  }

  const updatedVendor = await repository.updateVendorPerformance(id, payload);

  await createActivityEvent({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "vendor.performance.update",
    entityId: vendor._id,
    before: vendor.toObject(),
    after: updatedVendor ? updatedVendor.toObject() : {},
    source: user,
  });

  return updatedVendor;
}

module.exports = {
  create,
  list,
  getById,
  update,
  remove,
  updateStatus,
  verify,
  blacklist,
  trackPerformance,
};
