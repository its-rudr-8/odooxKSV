module.exports = {
  approvalRouter: require("./routes/approval.routes").approvalRouter,
  approvalController: require("./controller/approval.controller"),
  approvalService: require("./service/approval.service"),
  approvalRepository: require("./repository/approval.repository"),
};
