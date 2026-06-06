const { successResponse } = require("../../../shared/utils/response");
const activityLogService = require("../service/activityLog.service");

async function create(req, res, next) {
  try {
    const result = await activityLogService.create(req.body);
    return successResponse(res, "Activity log created", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  try {
    const result = await activityLogService.list();
    return successResponse(res, "Activity logs fetched", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, list };
