const express = require("express");

const { authMiddleware } = require("../../../shared/middleware/auth.middleware");
const { validateMiddleware } = require("../../../shared/middleware/validate.middleware");
const authController = require("../controller/auth.controller");
const { registerSchema, loginSchema, refreshSchema, logoutSchema, changePasswordSchema } = require("../validator/auth.validator");

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(registerSchema), authController.register);
authRouter.post("/login", validateMiddleware(loginSchema), authController.login);
authRouter.post("/refresh", validateMiddleware(refreshSchema), authController.refreshTokens);
authRouter.post("/logout", authMiddleware, validateMiddleware(logoutSchema), authController.logout);
authRouter.get("/me", authMiddleware, authController.me);
authRouter.patch("/change-password", authMiddleware, validateMiddleware(changePasswordSchema), authController.changePassword);

module.exports = { authRouter };