module.exports = {
  authRouter: require("./routes/auth.routes").authRouter,
  authController: require("./controller/auth.controller"),
  authService: require("./service/auth.service"),
  tokenService: require("./service/token.service"),
  authRepository: require("./repository/auth.repository"),
  tokenRepository: require("./repository/token.repository"),
};