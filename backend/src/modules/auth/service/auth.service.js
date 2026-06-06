const crypto = require("crypto");
const { comparePassword, hashPassword } = require("../../../shared/utils/password");
const { AppError } = require("../../../shared/errors/AppError");
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  appendRefreshToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
} = require("../repository/auth.repository");
const { createToken, findTokenByHash, revokeToken } = require("../repository/token.repository");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("./token.service");
const { toAuthUserDto } = require("../dto/auth.dto");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function buildTokenRecord(user, refreshToken, decodedRefreshToken, request = {}) {
  const tokenHash = hashToken(refreshToken);
  return {
    tokenHash,
    tokenId: decodedRefreshToken.jti,
    user: user._id,
    tokenType: "refresh",
    userAgent: request.userAgent || null,
    ipAddress: request.ipAddress || null,
    expiresAt: new Date(decodedRefreshToken.exp * 1000),
  };
}

function buildAuthResponse(user, refreshToken, decodedRefreshToken) {
  return {
    user: toAuthUserDto(user),
    accessToken: signAccessToken(user),
    refreshToken,
    refreshTokenExpiresAt: new Date(decodedRefreshToken.exp * 1000),
  };
}

async function register(payload) {
  const existingUser = await findUserByEmail(payload.email);
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const passwordHash = await hashPassword(payload.password);
  const user = await createUser({ ...payload, passwordHash });

  const refreshToken = signRefreshToken(user);
  const decodedRefreshToken = verifyRefreshToken(refreshToken);
  const tokenRecord = buildTokenRecord(user, refreshToken, decodedRefreshToken);
  await createToken(tokenRecord);
  await appendRefreshToken(user._id, tokenRecord);

  return buildAuthResponse(user, refreshToken, decodedRefreshToken);
}

async function login(payload) {
  const user = await findUserByEmail(payload.email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValidPassword = await comparePassword(payload.password, user.passwordHash);
  if (!isValidPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  user.lastLoginAt = new Date();
  await user.save();

  const refreshToken = signRefreshToken(user);
  const decodedRefreshToken = verifyRefreshToken(refreshToken);
  const tokenRecord = buildTokenRecord(user, refreshToken, decodedRefreshToken);
  await createToken(tokenRecord);
  await appendRefreshToken(user._id, tokenRecord);

  return buildAuthResponse(user, refreshToken, decodedRefreshToken);
}

async function refreshTokens(payload) {
  let decoded;
  try {
    decoded = verifyRefreshToken(payload.refreshToken);
  } catch (error) {
    throw new AppError("Invalid refresh token", 401);
  }

  const tokenHash = hashToken(payload.refreshToken);
  const tokenRecord = await findTokenByHash(tokenHash, "refresh");
  if (!tokenRecord || tokenRecord.revokedAt) {
    throw new AppError("Refresh token has been revoked", 401);
  }

  const user = await findUserById(decoded.sub);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await revokeToken(tokenHash, "refresh");
  await revokeRefreshToken(user._id, tokenHash);

  const refreshToken = signRefreshToken(user);
  const decodedRefreshToken = verifyRefreshToken(refreshToken);
  const newTokenRecord = buildTokenRecord(user, refreshToken, decodedRefreshToken);
  await createToken(newTokenRecord);
  await appendRefreshToken(user._id, newTokenRecord);

  return buildAuthResponse(user, refreshToken, decodedRefreshToken);
}

async function me(userId) {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return toAuthUserDto(user);
}

async function logout(userId, refreshToken) {
  const tokenHash = hashToken(refreshToken);
  await revokeToken(tokenHash, "refresh");
  await revokeRefreshToken(userId, tokenHash);
  return { success: true };
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await findUserById(userId, true);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isCurrentPasswordValid = await comparePassword(currentPassword, user.passwordHash);
  if (!isCurrentPasswordValid) {
    throw new AppError("Current password is incorrect", 400);
  }

  const passwordHash = await hashPassword(newPassword);
  const updatedUser = await updateUserById(userId, { passwordHash });
  await revokeAllRefreshTokens(userId);
  return toAuthUserDto(updatedUser);
}

module.exports = { register, login, refreshTokens, me, logout, changePassword };