function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const errors = error.errors || [];

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(statusCode).json({ success: false, message, errors });
}

module.exports = { errorHandler };