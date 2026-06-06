const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const invoiceController = require("../controller/invoice.controller");
const { invoiceSchema } = require("../validator/invoice.validator");

const invoiceRouter = express.Router();

invoiceRouter.post("/", authenticate, authorize("admin", "manager", "procurement_officer"), validateRequest(invoiceSchema), invoiceController.create);
invoiceRouter.get("/:id", authenticate, authorize("admin", "manager", "procurement_officer"), invoiceController.getById);
invoiceRouter.patch("/:id/generate", authenticate, authorize("admin", "manager"), invoiceController.generate);
invoiceRouter.patch("/:id/paid", authenticate, authorize("admin", "manager"), invoiceController.markPaid);

module.exports = { invoiceRouter };
