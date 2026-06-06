module.exports = {
  notificationRouter: require("./routes/notification.routes").notificationRouter,
  notificationController: require("./controller/notification.controller"),
  notificationService: require("./service/notification.service"),
  notificationRepository: require("./repository/notification.repository"),
};
