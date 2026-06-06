const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const notificationController = require("../controller/notification.controller");
const { notificationSchema } = require("../validator/notification.validator");

const notificationRouter = express.Router();

notificationRouter.post("/", authenticate, authorize("admin", "manager"), validateRequest(notificationSchema), notificationController.create);
notificationRouter.get("/recipient/:recipientId", authenticate, authorize("admin", "manager", "procurement_officer", "vendor"), notificationController.listForRecipient);
notificationRouter.patch("/:id/read", authenticate, authorize("admin", "manager", "procurement_officer", "vendor"), notificationController.markRead);

module.exports = { notificationRouter };
