const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const purchaseOrderController = require("../controller/purchaseOrder.controller");
const { purchaseOrderSchema } = require("../validator/purchaseOrder.validator");

const purchaseOrderRouter = express.Router();

purchaseOrderRouter.post("/", authenticate, authorize("procurement_officer", "admin"), validateRequest(purchaseOrderSchema), purchaseOrderController.create);
purchaseOrderRouter.get("/:id", authenticate, authorize("admin", "manager", "procurement_officer", "vendor"), purchaseOrderController.getById);
purchaseOrderRouter.patch("/:id/send", authenticate, authorize("procurement_officer", "admin"), purchaseOrderController.send);
purchaseOrderRouter.patch("/:id/complete", authenticate, authorize("manager", "admin"), purchaseOrderController.complete);
purchaseOrderRouter.patch("/:id/cancel", authenticate, authorize("manager", "admin"), purchaseOrderController.cancel);

module.exports = { purchaseOrderRouter };
