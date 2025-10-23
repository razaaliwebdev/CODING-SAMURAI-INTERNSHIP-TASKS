import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/checkout-success", checkoutSuccess);

export default router;

