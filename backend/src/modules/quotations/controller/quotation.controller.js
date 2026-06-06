const { successResponse } = require("../../../shared/utils/response");
const quotationService = require("../service/quotation.service");

async function create(req, res, next) {
  try {
    const result = await quotationService.create(req.body);
    return successResponse(res, "Quotation created", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const result = await quotationService.getById(req.params.id);
    return successResponse(res, "Quotation fetched", result);
  } catch (error) {
    return next(error);
  }
}

async function select(req, res, next) {
  try {
    const result = await quotationService.select(req.params.id, req.user?.sub);
    return successResponse(res, "Quotation selected", result);
  } catch (error) {
    return next(error);
  }
}

async function reject(req, res, next) {
  try {
    const result = await quotationService.reject(req.params.id, req.user?.sub, req.body.remarks);
    return successResponse(res, "Quotation rejected", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, getById, select, reject };
