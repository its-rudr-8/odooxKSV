const { ApiError } = require('../errors/ApiError');
const { logger } = require('../utils/logger');

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const errors = error.errors || [];

  logger.error(message, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: error.stack,
  });

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

module.exports = { errorMiddleware };
