module.exports = {
  rfqRouter: require("./routes/rfq.routes").rfqRouter,
  rfqController: require("./controller/rfq.controller"),
  rfqService: require("./service/rfq.service"),
  rfqRepository: require("./repository/rfq.repository"),
  rfqMapper: require("./mapper/rfq.mapper"),
  rfqDto: require("./dto/rfq.dto"),
  rfqValidator: require("./validator/rfq.validator"),
  rfqAccess: require("./rfq.access"),
};