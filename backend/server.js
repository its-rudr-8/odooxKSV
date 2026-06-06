const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { registerApp } = require("./src/app");

dotenv.config({ path: path.join(__dirname, "..", ".env") });
if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
  dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
}

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "VendorBridge backend is running", health: "/health" });
});
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected",
  });
});

registerApp(app);

async function startServer() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
