module.exports = {
  purchaseOrderRouter: require("./routes/purchaseOrder.routes").purchaseOrderRouter,
  purchaseOrderController: require("./controller/purchaseOrder.controller"),
  purchaseOrderService: require("./service/purchaseOrder.service"),
  purchaseOrderRepository: require("./repository/purchaseOrder.repository"),
};
