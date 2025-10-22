import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleFeatrureProduct } from '../controllers/productControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post("/", protect, admin, createProduct);
router.get("/", protect, admin, getAllProducts);
router.delete("/:id", protect, admin, deleteProduct);
router.patch("/:id", protect, admin, toggleFeatrureProduct);

router.get("/recommendations", protect, getRecommendedProducts);

router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);



export default router;