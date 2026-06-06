module.exports = {
  quotationRouter: require("./routes/quotation.routes").quotationRouter,
  quotationController: require("./controller/quotation.controller"),
  quotationService: require("./service/quotation.service"),
  quotationRepository: require("./repository/quotation.repository"),
};
