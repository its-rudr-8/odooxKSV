function toActivityLogDto(activityLog) {
  return {
    id: activityLog._id,
    action: activityLog.action,
    entityType: activityLog.entityType,
    entityId: activityLog.entityId,
    success: activityLog.success,
    createdAt: activityLog.createdAt,
  };
}

module.exports = { toActivityLogDto };
