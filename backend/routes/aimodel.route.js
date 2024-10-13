import express from 'express';
import { textGeneration, imageGeneration } from '../controllers/aimodel.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/text-generation", protectRoute, textGeneration);
router.post("/image-generation", protectRoute, imageGeneration);

export default router;