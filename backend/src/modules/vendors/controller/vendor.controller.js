const { successResponse } = require("../../../shared/utils/response");
const { asyncHandler } = require("../../../shared/utils/asyncHandler");
const vendorService = require("../service/vendor.service");

const create = asyncHandler(async (req, res) => {
  const result = await vendorService.create(req.body, req.user);
  return successResponse(res, "Vendor created", result, 201);
});

const list = asyncHandler(async (req, res) => {
  const result = await vendorService.list(req.query);
  return successResponse(res, "Vendors fetched", result);
});

const getById = asyncHandler(async (req, res) => {
  const result = await vendorService.getById(req.params.id, req.user);
  return successResponse(res, "Vendor fetched", result);
});

const update = asyncHandler(async (req, res) => {
  const result = await vendorService.update(req.params.id, req.body, req.user);
  return successResponse(res, "Vendor updated", result);
});

const remove = asyncHandler(async (req, res) => {
  const result = await vendorService.remove(req.params.id, req.user);
  return successResponse(res, "Vendor deleted", result);
});

const updateStatus = asyncHandler(async (req, res) => {
  const result = await vendorService.updateStatus(req.params.id, req.body.status, req.user);
  return successResponse(res, "Vendor status updated", result);
});

const verify = asyncHandler(async (req, res) => {
  const result = await vendorService.verify(req.params.id, req.user);
  return successResponse(res, "Vendor verified", result);
});

const blacklist = asyncHandler(async (req, res) => {
  const result = await vendorService.blacklist(req.params.id, req.user, req.body.reason);
  return successResponse(res, "Vendor blacklisted", result);
});

module.exports = { create, list, getById, update, remove, updateStatus, verify, blacklist };
