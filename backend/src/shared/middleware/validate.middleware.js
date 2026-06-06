const { ApiError } = require('../errors/ApiError');

function validateMiddleware(schema, property = 'body') {
  return function validation(req, res, next) {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(new ApiError(400, 'Validation failed', error.details.map((detail) => detail.message)));
    }

    req[property] = value;
    return next();
  };
}

module.exports = { validateMiddleware };
