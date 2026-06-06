module.exports = {
  invoiceRouter: require("./routes/invoice.routes").invoiceRouter,
  invoiceController: require("./controller/invoice.controller"),
  invoiceService: require("./service/invoice.service"),
  invoiceRepository: require("./repository/invoice.repository"),
};
