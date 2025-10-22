import express from 'express';
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post("/", protect, getCartProducts)
router.post("/", protect, addToCart)
router.delete("/", protect, removeAllFromCart);
router.delete("/:id", protect, updateQuantity);


export default router;

