const express = require("express");

const { authenticate } = require("../../../shared/middleware/authenticate");
const { authorize } = require("../../../shared/middleware/authorize");
const { validateRequest } = require("../../../shared/middleware/validateRequest");
const quotationController = require("../controller/quotation.controller");
const { quotationSchema } = require("../validator/quotation.validator");

const quotationRouter = express.Router();

quotationRouter.post("/", authenticate, authorize("vendor"), validateRequest(quotationSchema), quotationController.create);
quotationRouter.get("/:id", authenticate, authorize("admin", "manager", "procurement_officer"), quotationController.getById);
quotationRouter.patch("/:id/select", authenticate, authorize("procurement_officer"), quotationController.select);
quotationRouter.patch("/:id/reject", authenticate, authorize("procurement_officer"), quotationController.reject);

module.exports = { quotationRouter };
