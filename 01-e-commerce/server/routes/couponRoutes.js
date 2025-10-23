import express from 'express';
import { getCoupon, validateCoupon } from '../controllers/couponController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get("/", getCoupon)
router.get("/validate", protect, validateCoupon)

export default router;

