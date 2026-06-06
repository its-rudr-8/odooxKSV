const { AppError } = require("../../../shared/errors/AppError");
const { nextDocumentNumber } = require("../../../shared/utils/numberGenerator");
const { getPagination, buildPaginationResponse } = require("../../../shared/utils/pagination");
const { ensureValidTransition } = require("../../../shared/utils/workflow");
const { createActivityLog } = require("../../activityLogs/repository/activityLog.repository");
const { createNotification } = require("../../notifications/repository/notification.repository");
const { logger } = require("../../../shared/utils/logger");
const { RFQ_STATUS } = require("../../../config/rfqStatus.constants");
const rfqRepository = require("../repository/rfq.repository");
const vendorRepository = require("../../vendors/repository/vendor.repository");
const { toRfqDto } = require("../dto/rfq.dto");

const ENTITY_TYPE = "RFQ";

const RFQ_TRANSITIONS = {
  Draft: [RFQ_STATUS.OPEN],
  Open: [RFQ_STATUS.CLOSED, RFQ_STATUS.CANCELLED],
  Closed: [],
  Cancelled: [],
};

function getActorId(user) {
  return user?.sub || user?._id || null;
}

function sameId(left, right) {
  if (!left || !right) {
    return false;
  }

  return String(left) === String(right);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeStatus(status) {
  if (!status) {
    return RFQ_STATUS.DRAFT;
  }

  const normalized = String(status).trim().toLowerCase();

  switch (normalized) {
    case "draft":
      return RFQ_STATUS.DRAFT;
    case "open":
      return RFQ_STATUS.OPEN;
    case "closed":
      return RFQ_STATUS.CLOSED;
    case "cancelled":
      return RFQ_STATUS.CANCELLED;
    default:
      throw new AppError("Invalid RFQ status", 400);
  }
}

function buildDateRangeFilter(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new AppError("Invalid date filter", 400);
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { $gte: start, $lte: end };
}

function buildFilter(query = {}) {
  const filter = {};

  if (query.status) {
    filter.status = normalizeStatus(query.status);
  }

  if (query.priority) {
    filter.priority = query.priority;
  }

  if (query.category) {
    filter.category = new RegExp(escapeRegExp(query.category), "i");
  }

  if (query.createdBy) {
    filter.createdBy = query.createdBy;
  }

  if (query.requiredDeliveryDate) {
    filter.requiredDeliveryDate = buildDateRangeFilter(query.requiredDeliveryDate);
  }

  if (query.quotationDeadline) {
    filter.quotationDeadline = buildDateRangeFilter(query.quotationDeadline);
  }

  return filter;
}

function buildSort(query = {}) {
  const allowedSortFields = new Set([
    "rfqNumber",
    "title",
    "category",
    "priority",
    "budget",
    "status",
    "requiredDeliveryDate",
    "quotationDeadline",
    "createdAt",
    "updatedAt",
  ]);

  const sortBy = allowedSortFields.has(query.sortBy) ? query.sortBy : "createdAt";
  const sortOrder = String(query.sortOrder).toLowerCase() === "asc" ? 1 : -1;

  return { [sortBy]: sortOrder };
}

function normalizeDocs(documents) {
  return documents.map((document) => document?.toObject?.() || document);
}

async function resolveVendorDocs(vendorIds) {
  const uniqueVendorIds = [...new Set(vendorIds.map((vendorId) => String(vendorId)))];
  const vendors = await Promise.all(uniqueVendorIds.map((vendorId) => vendorRepository.findVendorById(vendorId)));
  const missingVendorIds = uniqueVendorIds.filter((vendorId, index) => !vendors[index]);

  if (missingVendorIds.length > 0) {
    throw new AppError(`Vendor not found: ${missingVendorIds.join(", ")}`, 404);
  }

  return vendors;
}

async function getVendorScope(user) {
  if (user?.role !== "vendor") {
    return null;
  }

  const vendor = await vendorRepository.findVendorByOwnerUser(getActorId(user));
  if (!vendor) {
    throw new AppError("Vendor profile not found", 403);
  }

  return vendor;
}

async function logActivity({ actor, actorRole, action, entityId, before = {}, after = {}, success = true, errorMessage = null, source = {} }) {
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
    logger.warn("Failed to create RFQ activity log", {
      action,
      entityId: String(entityId),
      error: error.message,
    });
  }
}

async function notifyVendorRecipients(vendorDocs, { type, title, message, metadata = {} }) {
  const recipients = normalizeDocs(vendorDocs);

  await Promise.all(
    recipients.map(async (vendor) => {
      try {
        await createNotification({
          recipientType: "vendor",
          recipient: vendor._id,
          recipientModel: "Vendor",
          type,
          channel: ["in_app"],
          title,
          message,
          metadata: { ...metadata, vendorId: vendor._id },
          sentAt: new Date(),
        });
      } catch (error) {
        logger.warn("Failed to create RFQ vendor notification", {
          vendorId: String(vendor._id),
          type,
          error: error.message,
        });
      }
    }),
  );
}

async function notifyUserRecipient(userId, { type, title, message, metadata = {} }) {
  if (!userId) {
    return;
  }

  try {
    await createNotification({
      recipientType: "user",
      recipient: userId,
      recipientModel: "User",
      type,
      channel: ["in_app"],
      title,
      message,
      metadata,
      sentAt: new Date(),
    });
  } catch (error) {
    logger.warn("Failed to create RFQ user notification", {
      userId: String(userId),
      type,
      error: error.message,
    });
  }
}

function ensureMutableStatus(status) {
  if (![RFQ_STATUS.DRAFT, RFQ_STATUS.OPEN].includes(status)) {
    throw new AppError("RFQ cannot be modified in its current status", 400);
  }
}

function buildBasePayload(payload, actorId) {
  return {
    ...payload,
    updatedBy: actorId,
  };
}

async function create(payload, user = {}, source = {}) {
  const actorId = getActorId(user);
  const assignedVendors = payload.assignedVendors || [];
  const vendorDocs = assignedVendors.length > 0 ? await resolveVendorDocs(assignedVendors) : [];

  const rfqNumber = await nextDocumentNumber({ key: "rfq", prefix: "RFQ" });
  const rfq = await rfqRepository.createRfq({
    ...payload,
    rfqNumber,
    status: RFQ_STATUS.DRAFT,
    createdBy: actorId,
    updatedBy: actorId,
    assignedVendors: vendorDocs.map((vendor) => vendor._id),
    openAt: null,
    closedAt: null,
    cancelledAt: null,
  });

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.create",
    entityId: rfq._id,
    before: {},
    after: rfq.toObject(),
    source,
  });

  if (vendorDocs.length > 0) {
    await notifyVendorRecipients(vendorDocs, {
      type: "rfq.assigned",
      title: "RFQ assigned",
      message: `You have been assigned RFQ ${rfq.rfqNumber}.`,
      metadata: { rfqId: rfq._id, rfqNumber: rfq.rfqNumber },
    });
  }

  return toRfqDto(rfq);
}

async function list(query = {}, user = {}, source = {}) {
  const { page, limit, skip } = getPagination(query);
  const filter = buildFilter(query);
  const search = query.search ? String(query.search).trim() : null;
  const sort = buildSort(query);
  const vendorScope = await getVendorScope(user);

  if (vendorScope) {
    filter.assignedVendors = vendorScope._id;
  }

  const [items, total] = await Promise.all([
    rfqRepository.listRfqs({ filter, search, sort, skip, limit }),
    rfqRepository.countRfqs({ filter, search }),
  ]);

  return {
    items: items.map(toRfqDto),
    pagination: buildPaginationResponse({ page, limit, total }),
  };
}

async function getById(id, user = {}, source = {}) {
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  const vendorScope = await getVendorScope(user);
  if (vendorScope && !rfq.assignedVendors.some((vendor) => sameId(vendor._id || vendor, vendorScope._id))) {
    throw new AppError("Forbidden", 403);
  }

  await logActivity({
    actor: getActorId(user),
    actorRole: user?.role || null,
    action: "rfq.view",
    entityId: rfq._id,
    before: {},
    after: rfq.toObject(),
    source,
  });

  return toRfqDto(rfq);
}

async function update(id, payload, user = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  const vendorScope = await getVendorScope(user);
  if (vendorScope) {
    throw new AppError("Forbidden", 403);
  }

  ensureMutableStatus(rfq.status);

  const updatedRfq = await rfqRepository.updateRfqById(id, buildBasePayload(payload, actorId));

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.update",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: updatedRfq ? updatedRfq.toObject() : {},
    source,
  });

  return toRfqDto(updatedRfq);
}

async function remove(id, user = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  const deletedRfq = await rfqRepository.softDeleteRfqById(id, actorId);

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.delete",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: {},
    source,
  });

  return deletedRfq ? toRfqDto(deletedRfq) : null;
}

async function open(id, user = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  ensureValidTransition(rfq.status, RFQ_STATUS.OPEN, RFQ_TRANSITIONS, "RFQ");

  const updatedRfq = await rfqRepository.updateRfqStatus(id, RFQ_STATUS.OPEN, {
    openAt: new Date(),
    updatedBy: actorId,
  });

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.open",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: updatedRfq ? updatedRfq.toObject() : {},
    source,
  });

  if (updatedRfq?.assignedVendors?.length > 0) {
    await notifyVendorRecipients(updatedRfq.assignedVendors, {
      type: "rfq.opened",
      title: "RFQ opened",
      message: `RFQ ${updatedRfq.rfqNumber} is now open.`,
      metadata: { rfqId: updatedRfq._id, rfqNumber: updatedRfq.rfqNumber },
    });
  }

  return toRfqDto(updatedRfq);
}

async function close(id, user = {}, payload = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  ensureValidTransition(rfq.status, RFQ_STATUS.CLOSED, RFQ_TRANSITIONS, "RFQ");

  const updatedRfq = await rfqRepository.updateRfqStatus(id, RFQ_STATUS.CLOSED, {
    closedAt: new Date(),
    remarks: payload.remarks ?? rfq.remarks,
    updatedBy: actorId,
  });

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.close",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: updatedRfq ? updatedRfq.toObject() : {},
    source,
  });

  if (updatedRfq?.assignedVendors?.length > 0) {
    await notifyVendorRecipients(updatedRfq.assignedVendors, {
      type: "rfq.closed",
      title: "RFQ closed",
      message: `RFQ ${updatedRfq.rfqNumber} has been closed.`,
      metadata: { rfqId: updatedRfq._id, rfqNumber: updatedRfq.rfqNumber },
    });
  }

  return toRfqDto(updatedRfq);
}

async function cancel(id, user = {}, payload = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  ensureValidTransition(rfq.status, RFQ_STATUS.CANCELLED, RFQ_TRANSITIONS, "RFQ");

  const updatedRfq = await rfqRepository.updateRfqStatus(id, RFQ_STATUS.CANCELLED, {
    cancelledAt: new Date(),
    remarks: payload.remarks ?? rfq.remarks,
    updatedBy: actorId,
  });

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.cancel",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: updatedRfq ? updatedRfq.toObject() : {},
    source,
  });

  if (updatedRfq?.assignedVendors?.length > 0) {
    await notifyVendorRecipients(updatedRfq.assignedVendors, {
      type: "rfq.cancelled",
      title: "RFQ cancelled",
      message: `RFQ ${updatedRfq.rfqNumber} has been cancelled.`,
      metadata: { rfqId: updatedRfq._id, rfqNumber: updatedRfq.rfqNumber },
    });
  }

  return toRfqDto(updatedRfq);
}

async function assignVendors(id, vendorIds, user = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  ensureMutableStatus(rfq.status);

  const vendorDocs = await resolveVendorDocs(vendorIds);
  const updatedRfq = await rfqRepository.assignRfqVendors(id, vendorDocs.map((vendor) => vendor._id), { updatedBy: actorId });

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.assign_vendors",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: updatedRfq ? updatedRfq.toObject() : {},
    source,
  });

  await notifyVendorRecipients(vendorDocs, {
    type: "rfq.assigned",
    title: "RFQ assigned",
    message: `You have been assigned RFQ ${rfq.rfqNumber}.`,
    metadata: { rfqId: rfq._id, rfqNumber: rfq.rfqNumber },
  });

  return toRfqDto(updatedRfq);
}

async function removeVendors(id, vendorIds, user = {}, source = {}) {
  const actorId = getActorId(user);
  const rfq = await rfqRepository.findRfqById(id);
  if (!rfq) {
    throw new AppError("RFQ not found", 404);
  }

  ensureMutableStatus(rfq.status);

  const vendorDocs = await resolveVendorDocs(vendorIds);
  const updatedRfq = await rfqRepository.removeRfqVendors(id, vendorDocs.map((vendor) => vendor._id), { updatedBy: actorId });

  await logActivity({
    actor: actorId,
    actorRole: user?.role || null,
    action: "rfq.remove_vendors",
    entityId: rfq._id,
    before: rfq.toObject(),
    after: updatedRfq ? updatedRfq.toObject() : {},
    source,
  });

  return toRfqDto(updatedRfq);
}

module.exports = {
  create,
  list,
  getById,
  update,
  remove,
  open,
  close,
  cancel,
  assignVendors,
  removeVendors,
};