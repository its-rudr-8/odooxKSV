const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

const LOCAL_DEV_ORIGIN_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

function parseAllowedOrigins() {
  return (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function buildCorsOptions() {
  const allowedOrigins = parseAllowedOrigins();
  const origins = allowedOrigins.length > 0 ? allowedOrigins : DEFAULT_ALLOWED_ORIGINS;
  const allowLocalDevOrigins = process.env.NODE_ENV !== "production";

  return {
    origin(origin, callback) {
      if (
        !origin ||
        origins.includes(origin) ||
        (allowLocalDevOrigins && LOCAL_DEV_ORIGIN_PATTERN.test(origin))
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  };
}

module.exports = { buildCorsOptions };
