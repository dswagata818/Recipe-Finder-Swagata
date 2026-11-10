
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ========================================
// Register User
// POST /api/auth/register
// ========================================

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        // Validate name
        const trimmedName = name.trim();

        if (trimmedName.length < 2 || trimmedName.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Name must be between 2 and 50 characters",
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

        // Validate password
        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name: trimmedName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Create JWT token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env");
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send response without password
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);

        // Handle duplicate email index errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to register user",
        });
    }
};
