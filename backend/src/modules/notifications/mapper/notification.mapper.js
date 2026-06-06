const { toNotificationDto } = require("../dto/notification.dto");

function mapNotification(notification) {
  return toNotificationDto(notification);
}

module.exports = { mapNotification };
