const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function parseAllowedOrigins() {
  return (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function buildCorsOptions() {
  const allowedOrigins = parseAllowedOrigins();
  const origins = allowedOrigins.length > 0 ? allowedOrigins : DEFAULT_ALLOWED_ORIGINS;

  return {
    origin(origin, callback) {
      if (!origin || origins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  };
}

module.exports = { buildCorsOptions };
