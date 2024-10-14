import express from 'express';
import { textGeneration, imageGeneration, audioGeneration, textToAudioGeneration } from '../controllers/aimodel.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/text-generation", protectRoute, textGeneration);
router.post("/image-generation", protectRoute, imageGeneration);
router.post("/audio-generation", protectRoute, audioGeneration);
router.post("/text-audio-generation", protectRoute, textToAudioGeneration);

export default router;