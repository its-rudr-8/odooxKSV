const { successResponse } = require("../../../shared/utils/response");
const authService = require("../service/auth.service");

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    return successResponse(res, "Registration successful", result, 201);
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, "Login successful", result);
  } catch (error) {
    return next(error);
  }
}

async function refreshTokens(req, res, next) {
  try {
    const result = await authService.refreshTokens(req.body);
    return successResponse(res, "Token refreshed", result);
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const result = await authService.me(req.user.sub);
    return successResponse(res, "Current user", result);
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  try {
    const result = await authService.logout(req.user.sub, req.body.refreshToken);
    return successResponse(res, "Logged out successfully", result);
  } catch (error) {
    return next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const result = await authService.changePassword(req.user.sub, req.body.currentPassword, req.body.newPassword);
    return successResponse(res, "Password changed", result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, refreshTokens, me, logout, changePassword };