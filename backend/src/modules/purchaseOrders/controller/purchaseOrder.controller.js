const { successResponse } = require("../../../shared/utils/response");
const purchaseOrderService = require("../service/purchaseOrder.service");

async function create(req, res, next) {
  try {
    const result = await purchaseOrderService.create(req.body);
    return successResponse(res, "Purchase order created", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const result = await purchaseOrderService.getById(req.params.id);
    return successResponse(res, "Purchase order fetched", result);
  } catch (error) {
    return next(error);
  }
}

async function send(req, res, next) {
  try {
    const result = await purchaseOrderService.send(req.params.id, req.user?.sub);
    return successResponse(res, "Purchase order sent", result);
  } catch (error) {
    return next(error);
  }
}

async function complete(req, res, next) {
  try {
    const result = await purchaseOrderService.complete(req.params.id, req.user?.sub);
    return successResponse(res, "Purchase order completed", result);
  } catch (error) {
    return next(error);
  }
}

async function cancel(req, res, next) {
  try {
    const result = await purchaseOrderService.cancel(req.params.id, req.user?.sub);
    return successResponse(res, "Purchase order cancelled", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, getById, send, complete, cancel };
