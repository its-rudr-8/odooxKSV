const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function buildPayload(user) {
  return {
    sub: user._id.toString(),
    role: user.role,
    email: user.email,
    permissions: user.permissions || [],
  };
}

function signAccessToken(user) {
  return jwt.sign(buildPayload(user), process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  });
}

function signRefreshToken(user) {
  return jwt.sign(buildPayload(user), process.env.JWT_REFRESH_SECRET, {
    jwtid: crypto.randomUUID(),
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
