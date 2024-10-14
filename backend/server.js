import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import aiModels from "./routes/aimodel.route.js"
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));}

app.use(express.json());
app.use(cookieParser());

// Routes for users
app.use("/api/v1/auth", authRoutes);
// Routes for ai models
app.use("/api/v1/models", aiModels);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
