const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { apiRouter } = require("./routes");
const { errorHandler } = require("./shared/middleware/errorHandler");
const { notFound } = require("./shared/middleware/notFound");

function registerApp(app) {
  app.use(cors());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use("/api/v1", apiRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { registerApp };
