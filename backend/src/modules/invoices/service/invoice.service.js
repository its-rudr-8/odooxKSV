const { AppError } = require("../../../shared/errors/AppError");
const { nextDocumentNumber } = require("../../../shared/utils/numberGenerator");
const { ensureValidTransition } = require("../../../shared/utils/workflow");
const { createInvoice, findInvoiceById, updateInvoiceStatus } = require("../repository/invoice.repository");
const { toInvoiceDto } = require("../dto/invoice.dto");

const INVOICE_TRANSITIONS = {
  draft: ["generated"],
  generated: ["paid"],
  paid: [],
};

async function create(payload) {
  const invoiceNumber = payload.invoiceNumber || (await nextDocumentNumber({ key: "invoice", prefix: "INV" }));
  const invoice = await createInvoice({ ...payload, invoiceNumber, status: payload.status || "draft" });
  return toInvoiceDto(invoice);
}

async function getById(id) {
  const invoice = await findInvoiceById(id);
  if (!invoice) {
    throw new AppError("Invoice not found", 404);
  }

  return toInvoiceDto(invoice);
}

async function generate(id, actorId) {
  const invoice = await findInvoiceById(id);
  if (!invoice) throw new AppError("Invoice not found", 404);
  ensureValidTransition(invoice.status, "generated", INVOICE_TRANSITIONS, "invoice");
  const updated = await updateInvoiceStatus(id, "generated", { generatedAt: new Date(), updatedBy: actorId });
  return toInvoiceDto(updated);
}

async function markPaid(id, actorId) {
  const invoice = await findInvoiceById(id);
  if (!invoice) throw new AppError("Invoice not found", 404);
  ensureValidTransition(invoice.status, "paid", INVOICE_TRANSITIONS, "invoice");
  const updated = await updateInvoiceStatus(id, "paid", { paidAt: new Date(), updatedBy: actorId });
  return toInvoiceDto(updated);
}

module.exports = { create, getById, generate, markPaid };
