module.exports = {
  vendorRouter: require("./routes/vendor.routes").vendorRouter,
  vendorController: require("./controller/vendor.controller"),
  vendorService: require("./service/vendor.service"),
  vendorRepository: require("./repository/vendor.repository"),
  vendorSchema: require("./schema/vendor.schema"),
  vendorAccess: require("./vendor.access"),
};