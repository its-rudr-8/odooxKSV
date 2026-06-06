const { createActivityLog, listActivityLogs } = require("../repository/activityLog.repository");
const { toActivityLogDto } = require("../dto/activityLog.dto");

async function create(payload) {
  const activityLog = await createActivityLog(payload);
  return toActivityLogDto(activityLog);
}

async function list(filter = {}) {
  const activityLogs = await listActivityLogs(filter);
  return activityLogs.map(toActivityLogDto);
}

module.exports = { create, list };
