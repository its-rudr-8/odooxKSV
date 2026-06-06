const express = require("express");

const { authRouter } = require("../modules/auth/routes/auth.routes");
const { vendorRouter } = require("../modules/vendors/routes/vendor.routes");
const { rfqRouter } = require("../modules/rfqs/routes/rfq.routes");
const { quotationRouter } = require("../modules/quotations/routes/quotation.routes");
const { approvalRouter } = require("../modules/approvals/routes/approval.routes");
const { purchaseOrderRouter } = require("../modules/purchaseOrders/routes/purchaseOrder.routes");
const { invoiceRouter } = require("../modules/invoices/routes/invoice.routes");
const { notificationRouter } = require("../modules/notifications/routes/notification.routes");
const { activityLogRouter } = require("../modules/activityLogs/routes/activityLog.routes");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/vendors", vendorRouter);
apiRouter.use("/rfqs", rfqRouter);
apiRouter.use("/quotations", quotationRouter);
apiRouter.use("/approvals", approvalRouter);
apiRouter.use("/purchase-orders", purchaseOrderRouter);
apiRouter.use("/invoices", invoiceRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/activity-logs", activityLogRouter);

module.exports = { apiRouter };