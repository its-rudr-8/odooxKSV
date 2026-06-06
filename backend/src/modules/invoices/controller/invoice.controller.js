const { successResponse } = require("../../../shared/utils/response");
const invoiceService = require("../service/invoice.service");

async function create(req, res, next) {
  try {
    const result = await invoiceService.create(req.body);
    return successResponse(res, "Invoice created", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const result = await invoiceService.getById(req.params.id);
    return successResponse(res, "Invoice fetched", result);
  } catch (error) {
    return next(error);
  }
}

async function generate(req, res, next) {
  try {
    const result = await invoiceService.generate(req.params.id, req.user?.sub);
    return successResponse(res, "Invoice generated", result);
  } catch (error) {
    return next(error);
  }
}

async function markPaid(req, res, next) {
  try {
    const result = await invoiceService.markPaid(req.params.id, req.user?.sub);
    return successResponse(res, "Invoice paid", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, getById, generate, markPaid };
