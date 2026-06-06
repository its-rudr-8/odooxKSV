const { toAuthUserDto } = require("../dto/auth.dto");

function mapAuthProfile(user) {
  return toAuthUserDto(user);
}

module.exports = { mapAuthProfile };