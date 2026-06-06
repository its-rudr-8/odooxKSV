const express = require("express");

const { authMiddleware } = require("../../../shared/middleware/auth.middleware");
const { roleMiddleware } = require("../../../shared/middleware/role.middleware");
const { validateMiddleware } = require("../../../shared/middleware/validate.middleware");
const vendorController = require("../controller/vendor.controller");
const {
	vendorCreateSchema,
	vendorUpdateSchema,
	vendorStatusSchema,
	vendorQuerySchema,
	vendorActionSchema,
} = require("../validator/vendor.validator");

const vendorRouter = express.Router();

vendorRouter.post("/", authMiddleware, roleMiddleware("admin"), validateMiddleware(vendorCreateSchema), vendorController.create);
vendorRouter.get("/", authMiddleware, roleMiddleware("admin", "manager", "procurement_officer"), validateMiddleware(vendorQuerySchema, "query"), vendorController.list);
vendorRouter.get("/:id", authMiddleware, roleMiddleware("admin", "manager", "procurement_officer", "vendor"), vendorController.getById);
vendorRouter.put("/:id", authMiddleware, roleMiddleware("admin"), validateMiddleware(vendorUpdateSchema), vendorController.update);
vendorRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), vendorController.remove);
vendorRouter.patch("/:id/status", authMiddleware, roleMiddleware("admin"), validateMiddleware(vendorStatusSchema), vendorController.updateStatus);
vendorRouter.patch("/:id/verify", authMiddleware, roleMiddleware("admin"), vendorController.verify);
vendorRouter.patch("/:id/blacklist", authMiddleware, roleMiddleware("admin"), validateMiddleware(vendorActionSchema), vendorController.blacklist);

module.exports = { vendorRouter };