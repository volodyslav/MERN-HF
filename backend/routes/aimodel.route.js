import express from 'express';
import { textGeneration } from '../controllers/aimodel.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/text-generation", protectRoute, textGeneration);

export default router;