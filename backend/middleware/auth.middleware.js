import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-content"];
        
        // Validate token
        if (!token) {
            return res.status(401).json({ message: "Not authorized, token is required" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Find user by ID
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protect route ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};