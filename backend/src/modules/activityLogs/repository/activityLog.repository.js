const ActivityLog = require("../schema/activityLog.schema");

async function createActivityLog(payload) {
  const activityLog = new ActivityLog(payload);
  return activityLog.save();
}

async function listActivityLogs(filter = {}) {
  return ActivityLog.find({ isDeleted: false, ...filter }).sort({ createdAt: -1 });
}

module.exports = { createActivityLog, listActivityLogs };
