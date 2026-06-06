const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const activityLogController = require("../controller/activityLog.controller");
const { activityLogSchema } = require("../validator/activityLog.validator");

const activityLogRouter = express.Router();

activityLogRouter.post("/", authenticate, authorize("admin", "manager"), validateRequest(activityLogSchema), activityLogController.create);
activityLogRouter.get("/", authenticate, authorize("admin", "manager"), activityLogController.list);

module.exports = { activityLogRouter };
