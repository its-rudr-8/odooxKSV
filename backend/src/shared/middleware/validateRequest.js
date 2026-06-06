const { AppError } = require("../errors/AppError");

function validateRequest(schema, property = "body") {
  return function validationMiddleware(req, res, next) {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(new AppError("Validation failed", 400, error.details.map((detail) => detail.message)));
    }

    req[property] = value;
    return next();
  };
}

module.exports = { validateRequest };