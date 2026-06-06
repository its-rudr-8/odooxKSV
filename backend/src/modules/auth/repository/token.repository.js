const Token = require('../schema/token.schema');

async function createToken(payload) {
  const token = new Token(payload);
  return token.save();
}

async function findTokenByHash(tokenHash, tokenType = 'refresh') {
  return Token.findOne({ tokenHash, tokenType, revokedAt: null });
}

async function revokeToken(tokenHash, tokenType = 'refresh') {
  return Token.findOneAndUpdate(
    { tokenHash, tokenType, revokedAt: null },
    { $set: { revokedAt: new Date() } },
    { new: true },
  );
}

async function revokeTokensForUser(userId) {
  return Token.updateMany({ user: userId, revokedAt: null }, { $set: { revokedAt: new Date() } });
}

module.exports = {
  createToken,
  findTokenByHash,
  revokeToken,
  revokeTokensForUser,
};
