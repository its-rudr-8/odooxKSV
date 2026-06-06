const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const purchaseOrderController = require("../controller/purchaseOrder.controller");
const { purchaseOrderSchema } = require("../validator/purchaseOrder.validator");

const purchaseOrderRouter = express.Router();

purchaseOrderRouter.post("/", authenticate, authorize("admin", "manager", "procurement_officer"), validateRequest(purchaseOrderSchema), purchaseOrderController.create);
purchaseOrderRouter.get("/:id", authenticate, authorize("admin", "manager", "procurement_officer"), purchaseOrderController.getById);
purchaseOrderRouter.patch("/:id/send", authenticate, authorize("admin", "manager", "procurement_officer"), purchaseOrderController.send);
purchaseOrderRouter.patch("/:id/complete", authenticate, authorize("admin", "manager"), purchaseOrderController.complete);
purchaseOrderRouter.patch("/:id/cancel", authenticate, authorize("admin", "manager"), purchaseOrderController.cancel);

module.exports = { purchaseOrderRouter };
