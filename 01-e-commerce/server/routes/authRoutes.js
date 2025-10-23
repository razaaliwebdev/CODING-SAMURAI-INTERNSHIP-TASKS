import express from 'express';
import { login, logout, refreshToken, signUp, userProfile } from '../controllers/authControllers.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express();


router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protect, userProfile);


export default router;