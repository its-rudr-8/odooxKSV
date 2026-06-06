const { successResponse } = require("../../../shared/utils/response");
const notificationService = require("../service/notification.service");

async function create(req, res, next) {
  try {
    const result = await notificationService.create(req.body);
    return successResponse(res, "Notification created", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function listForRecipient(req, res, next) {
  try {
    const result = await notificationService.listForRecipient(req.params.recipientId);
    return successResponse(res, "Notifications fetched", result);
  } catch (error) {
    return next(error);
  }
}

async function markRead(req, res, next) {
  try {
    const result = await notificationService.markRead(req.params.id);
    return successResponse(res, "Notification marked as read", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, listForRecipient, markRead };
