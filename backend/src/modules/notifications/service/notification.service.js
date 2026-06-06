const { AppError } = require("../../../shared/errors/AppError");
const { createNotification, findNotificationsByRecipient, markNotificationRead } = require("../repository/notification.repository");
const { toNotificationDto } = require("../dto/notification.dto");

async function create(payload) {
  const notification = await createNotification(payload);
  return toNotificationDto(notification);
}

async function listForRecipient(recipient) {
  const notifications = await findNotificationsByRecipient(recipient);
  return notifications.map(toNotificationDto);
}

async function markRead(id) {
  const notification = await markNotificationRead(id);
  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return toNotificationDto(notification);
}

module.exports = { create, listForRecipient, markRead };
