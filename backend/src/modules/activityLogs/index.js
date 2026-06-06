module.exports = {
  activityLogRouter: require("./routes/activityLog.routes").activityLogRouter,
  activityLogController: require("./controller/activityLog.controller"),
  activityLogService: require("./service/activityLog.service"),
  activityLogRepository: require("./repository/activityLog.repository"),
};
