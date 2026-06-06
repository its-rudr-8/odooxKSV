const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const approvalController = require("../controller/approval.controller");
const { approvalSchema, approvalDecisionSchema } = require("../validator/approval.validator");

const approvalRouter = express.Router();

approvalRouter.post("/", authenticate, authorize("procurement_officer", "admin"), validateRequest(approvalSchema), approvalController.create);
approvalRouter.get("/:id", authenticate, authorize("admin", "manager", "procurement_officer"), approvalController.getById);
approvalRouter.patch("/:id/approve", authenticate, authorize("manager", "admin"), validateRequest(approvalDecisionSchema), approvalController.approve);
approvalRouter.patch("/:id/reject", authenticate, authorize("manager", "admin"), validateRequest(approvalDecisionSchema), approvalController.reject);

module.exports = { approvalRouter };
