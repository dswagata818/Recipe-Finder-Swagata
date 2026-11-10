
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Server configuration
const PORT = process.env.PORT || 5000;

// ========================================
// Middleware
// ========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// Root Route
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Swagata Recipe Finder API is running!",
  });
});

// ========================================
// Health Check Route
// ========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

// ========================================
// 404 Route
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ========================================
// Global Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.status && err.status < 500
        ? err.message
        : "Internal server error",
  });
});

// ========================================
// Connect Database & Start Server
// ========================================

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully!");
    console.log(
      "Database name:",
      mongoose.connection.name
    );

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
