const Notification = require("../schema/notification.schema");

async function createNotification(payload) {
  const notification = new Notification(payload);
  return notification.save();
}

async function findNotificationsByRecipient(recipient) {
  return Notification.find({ recipient, isDeleted: false }).sort({ createdAt: -1 });
}

async function markNotificationRead(id) {
  return Notification.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { readAt: new Date() } }, { new: true });
}

module.exports = { createNotification, findNotificationsByRecipient, markNotificationRead };
