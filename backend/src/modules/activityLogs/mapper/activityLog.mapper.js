const { toActivityLogDto } = require("../dto/activityLog.dto");

function mapActivityLog(activityLog) {
  return toActivityLogDto(activityLog);
}

module.exports = { mapActivityLog };
