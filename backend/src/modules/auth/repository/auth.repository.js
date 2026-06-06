const User = require("../schema/user.schema");

async function findUserByEmail(email) {
  return User.findOne({ email, isDeleted: false }).select("+passwordHash");
}

async function createUser(payload) {
  const user = new User(payload);
  return user.save();
}

async function findUserById(id) {
  return User.findOne({ _id: id, isDeleted: false });
}

async function updateUserById(id, payload) {
  return User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: payload }, { new: true });
}

async function appendRefreshToken(id, tokenRecord) {
  return User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $push: { refreshTokens: tokenRecord } },
    { new: true },
  );
}

async function revokeRefreshToken(id, tokenHash) {
  return User.findOneAndUpdate(
    { _id: id, isDeleted: false, "refreshTokens.tokenHash": tokenHash },
    { $set: { "refreshTokens.$.revokedAt": new Date() } },
    { new: true },
  );
}

async function revokeAllRefreshTokens(id) {
  return User.updateOne(
    { _id: id, isDeleted: false },
    { $set: { "refreshTokens.$[].revokedAt": new Date() } },
  );
}

module.exports = { findUserByEmail, createUser, findUserById, updateUserById, appendRefreshToken, revokeRefreshToken, revokeAllRefreshTokens };