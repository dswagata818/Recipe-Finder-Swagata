import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const unauthorized = (res, message = "Invalid or missing authentication token") =>
    res.status(401).json({
        success: false,
        message,
    });

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (typeof authorization !== "string") {
        return unauthorized(res);
    }

    const [scheme, token, ...extraParts] = authorization.trim().split(/\s+/);

    if (
        scheme?.toLowerCase() !== "bearer" ||
        !token ||
        extraParts.length > 0
    ) {
        return unauthorized(res);
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return next(new Error("JWT_SECRET is missing in .env"));
    }

    let payload;

    try {
        payload = jwt.verify(token, jwtSecret);
    } catch {
        return unauthorized(res);
    }

    if (
        payload === null ||
        typeof payload !== "object" ||
        typeof payload.userId !== "string" ||
        !mongoose.isObjectIdOrHexString(payload.userId)
    ) {
        return unauthorized(res);
    }

    try {
        // Confirm the account still exists before granting access.
        const user = await User.findById(payload.userId).select("_id");

        if (!user) {
            return unauthorized(res, "User no longer exists");
        }

        req.user = user._id.toString();
        return next();
    } catch (error) {
        return next(error);
    }
};

export default authMiddleware;
