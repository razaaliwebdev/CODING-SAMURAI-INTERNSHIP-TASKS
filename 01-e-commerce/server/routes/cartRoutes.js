import express from 'express';
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", protect, getCartProducts);
router.post("/", protect, addToCart);
router.delete("/", protect, removeAllFromCart);
router.put("/:productId", protect, updateQuantity);

export default router;
