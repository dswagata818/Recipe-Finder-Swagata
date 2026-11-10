
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";

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

// Parse incoming JSON data
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ========================================
// Root Route
// ========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Swagata Recipe Finder API",
    });
});

// ========================================
// Health Check Route
// ========================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully",
        database:
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Disconnected",
        timestamp: new Date().toISOString(),
    });
});

// ========================================
// 404 Not Found Handler
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

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode < 500
                ? err.message
                : "Internal server error",
    });
});

// ========================================
// Start Server
// ========================================

const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start Express server after DB connection
        app.listen(PORT, () => {
            console.log(
                `Server running at http://localhost:${PORT}`
            );
            console.log(
                `Health check: http://localhost:${PORT}/api/health`
            );
        });
    } catch (error) {
        console.error(
            "Failed to start application:",
            error.message
        );

        process.exit(1);
    }
};

startServer();
