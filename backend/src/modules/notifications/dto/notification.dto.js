function toNotificationDto(notification) {
  return {
    id: notification._id,
    recipientType: notification.recipientType,
    recipient: notification.recipient,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    readAt: notification.readAt,
    sentAt: notification.sentAt,
  };
}

module.exports = { toNotificationDto };
