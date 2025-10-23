import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { getAnalytics } from '../controllers/analyticsController.js'


const router = express.Router();

router.get("/", protect, admin, getAnalytics);



export default router;