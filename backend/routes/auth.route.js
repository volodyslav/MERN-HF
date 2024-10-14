import express from "express";
import { signup, login, logout, setUpEmail } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// For authentication
const router = express.Router();

router.post("/send-email", setUpEmail);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", protectRoute, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error get: ", error);
        res.status(500).json({ error: "Internal Server Error"})
    }
})

export default router;