const { successResponse } = require("../../../shared/utils/response");
const approvalService = require("../service/approval.service");

async function create(req, res, next) {
  try {
    const result = await approvalService.create(req.body);
    return successResponse(res, "Approval created", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const result = await approvalService.getById(req.params.id);
    return successResponse(res, "Approval fetched", result);
  } catch (error) {
    return next(error);
  }
}

async function approve(req, res, next) {
  try {
    const result = await approvalService.approve(req.params.id, req.user?.sub, req.body.remarks);
    return successResponse(res, "Approval approved", result);
  } catch (error) {
    return next(error);
  }
}

async function reject(req, res, next) {
  try {
    const result = await approvalService.reject(req.params.id, req.user?.sub, req.body.remarks);
    return successResponse(res, "Approval rejected", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, getById, approve, reject };
