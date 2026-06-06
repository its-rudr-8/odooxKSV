const express = require("express");

const { authMiddleware } = require("../../../shared/middleware/auth.middleware");
const { roleMiddleware } = require("../../../shared/middleware/role.middleware");
const { validateMiddleware } = require("../../../shared/middleware/validate.middleware");
const rfqController = require("../controller/rfq.controller");
const {
	rfqCreateSchema,
	rfqUpdateSchema,
	rfqAssignSchema,
	rfqRemoveSchema,
	rfqQuerySchema,
	rfqActionSchema,
} = require("../validator/rfq.validator");

const rfqRouter = express.Router();

rfqRouter.post("/", authMiddleware, roleMiddleware("admin", "procurement_officer"), validateMiddleware(rfqCreateSchema), rfqController.create);
rfqRouter.get("/", authMiddleware, roleMiddleware("admin", "manager", "procurement_officer", "vendor"), validateMiddleware(rfqQuerySchema, "query"), rfqController.list);
rfqRouter.get("/:id", authMiddleware, roleMiddleware("admin", "manager", "procurement_officer", "vendor"), rfqController.getById);
rfqRouter.put("/:id", authMiddleware, roleMiddleware("admin", "procurement_officer"), validateMiddleware(rfqUpdateSchema), rfqController.update);
rfqRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), rfqController.remove);
rfqRouter.patch("/:id/open", authMiddleware, roleMiddleware("admin", "procurement_officer"), rfqController.open);
rfqRouter.patch("/:id/close", authMiddleware, roleMiddleware("admin", "procurement_officer"), validateMiddleware(rfqActionSchema), rfqController.close);
rfqRouter.patch("/:id/cancel", authMiddleware, roleMiddleware("admin", "procurement_officer"), validateMiddleware(rfqActionSchema), rfqController.cancel);
rfqRouter.patch("/:id/assign-vendors", authMiddleware, roleMiddleware("admin", "procurement_officer"), validateMiddleware(rfqAssignSchema), rfqController.assignVendors);
rfqRouter.patch("/:id/remove-vendors", authMiddleware, roleMiddleware("admin", "procurement_officer"), validateMiddleware(rfqRemoveSchema), rfqController.removeVendors);

module.exports = { rfqRouter };