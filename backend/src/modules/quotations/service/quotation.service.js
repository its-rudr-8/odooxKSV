const { AppError } = require("../../../shared/errors/AppError");
const { nextDocumentNumber } = require("../../../shared/utils/numberGenerator");
const { ensureValidTransition } = require("../../../shared/utils/workflow");
const { ENTITY_STATUS } = require("../../../config/constants");
const { createQuotation, findQuotationById, updateQuotationStatus } = require("../repository/quotation.repository");
const { toQuotationDto } = require("../dto/quotation.dto");

const QUOTATION_TRANSITIONS = {
  submitted: ["selected", "rejected"],
  selected: [],
  rejected: [],
};

async function create(payload) {
  const quotationNumber = payload.quotationNumber || (await nextDocumentNumber({ key: "quotation", prefix: "QUO" }));
  const quotation = await createQuotation({ ...payload, quotationNumber, status: payload.status || "submitted" });
  return toQuotationDto(quotation);
}

async function getById(id) {
  const quotation = await findQuotationById(id);
  if (!quotation) {
    throw new AppError("Quotation not found", 404);
  }

  return toQuotationDto(quotation);
}

async function select(id, actorId) {
  const quotation = await findQuotationById(id);
  if (!quotation) {
    throw new AppError("Quotation not found", 404);
  }

  ensureValidTransition(quotation.status, "selected", QUOTATION_TRANSITIONS, "quotation");
  const updated = await updateQuotationStatus(id, "selected", { selectedAt: new Date(), updatedBy: actorId });
  return toQuotationDto(updated);
}

async function reject(id, actorId, remarks) {
  const quotation = await findQuotationById(id);
  if (!quotation) {
    throw new AppError("Quotation not found", 404);
  }

  ensureValidTransition(quotation.status, "rejected", QUOTATION_TRANSITIONS, "quotation");
  const updated = await updateQuotationStatus(id, "rejected", { rejectedAt: new Date(), remarks, updatedBy: actorId });
  return toQuotationDto(updated);
}

module.exports = { create, getById, select, reject };
