const { ApiError } = require('../errors/ApiError');

function roleMiddleware(...allowedRoles) {
  return function roleGuard(req, res, next) {
    const role = req.user?.role;

    if (!role) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    if (!allowedRoles.includes(role)) {
      return next(new ApiError(403, 'Forbidden'));
    }

    return next();
  };
}

module.exports = { roleMiddleware };
