const { AppError } = require("../errors/AppError");

function authorize(...allowedRoles) {
  return function authorizeMiddleware(req, res, next) {
    const userRole = req.user?.role;
    if (!userRole) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!allowedRoles.includes(userRole)) {
      return next(new AppError("Forbidden", 403));
    }

    return next();
  };
}

module.exports = { authorize };