import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Routes for users
app.use("/api/v1/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
