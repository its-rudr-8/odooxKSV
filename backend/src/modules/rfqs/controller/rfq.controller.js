const { successResponse } = require("../../../shared/utils/response");
const { asyncHandler } = require("../../../shared/utils/asyncHandler");
const rfqService = require("../service/rfq.service");

function buildContext(req) {
  return {
    actor: req.user,
    ipAddress: req.ip,
    userAgent: req.get("user-agent") || null,
  };
}

const create = asyncHandler(async (req, res) => {
  const result = await rfqService.create(req.body, req.user, buildContext(req));
  return successResponse(res, "RFQ created", result, 201);
});

const list = asyncHandler(async (req, res) => {
  const result = await rfqService.list(req.query, req.user, buildContext(req));
  return successResponse(res, "RFQs fetched", result);
});

const getById = asyncHandler(async (req, res) => {
  const result = await rfqService.getById(req.params.id, req.user, buildContext(req));
  return successResponse(res, "RFQ fetched", result);
});

const update = asyncHandler(async (req, res) => {
  const result = await rfqService.update(req.params.id, req.body, req.user, buildContext(req));
  return successResponse(res, "RFQ updated", result);
});

const remove = asyncHandler(async (req, res) => {
  const result = await rfqService.remove(req.params.id, req.user, buildContext(req));
  return successResponse(res, "RFQ deleted", result);
});

const open = asyncHandler(async (req, res) => {
  const result = await rfqService.open(req.params.id, req.user, buildContext(req));
  return successResponse(res, "RFQ opened", result);
});

const close = asyncHandler(async (req, res) => {
  const result = await rfqService.close(req.params.id, req.user, req.body, buildContext(req));
  return successResponse(res, "RFQ closed", result);
});

const cancel = asyncHandler(async (req, res) => {
  const result = await rfqService.cancel(req.params.id, req.user, req.body, buildContext(req));
  return successResponse(res, "RFQ cancelled", result);
});

const assignVendors = asyncHandler(async (req, res) => {
  const result = await rfqService.assignVendors(req.params.id, req.body.vendorIds, req.user, buildContext(req));
  return successResponse(res, "RFQ vendors assigned", result);
});

const removeVendors = asyncHandler(async (req, res) => {
  const result = await rfqService.removeVendors(req.params.id, req.body.vendorIds, req.user, buildContext(req));
  return successResponse(res, "RFQ vendors removed", result);
});

module.exports = { create, list, getById, update, remove, open, close, cancel, assignVendors, removeVendors };