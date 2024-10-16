import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";


export const setUpEmail = async(req, res) => {
    try {
        const { email } = req.body;
        // Check if email already exists
        const emailExists = await User.findOne({ email: email});
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const profileUrl = process.env.CLIENT_URL + "/signup";
        await sendWelcomeEmail(email, profileUrl);
        res.status(200).json({ message: "Email was sent successfully"});
    } catch (error) {
        console.error("Error sending an email", error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const signup = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        
        // Check all the fields
        if (!username ||!password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        
        // Check if username already exists
        const usernameExists = await User.findOne({ username: username});
        if (usernameExists) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Check if password length
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        // Check if username length is
        if (username.length < 3) {
            return res.status(400).json({ error: "Username must be at least 3 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Create token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})
        await res.cookie("jwt-content", token, {
            httpOnly: true,  
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"  
        })

        res.status(201).json({
            message: "User registered successfully"
        })

        

    } catch (error) {
        console.error("Error in signup: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check all the fields
        if (!username ||!password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})
        await res.cookie("jwt-content", token, {
            httpOnly: true,  
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"  
        })
        res.json({
            message: "User logged in successfully"
        })


    } catch (error) {
        console.error("Error in login: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("jwt-content");
    res.json({message: "Logged out successfully"});
}