import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/generateTokens.js';
import { storeRefreshToken } from '../utils/storeRefreshToken.js';
import { setCookies } from '../utils/setCookies.js';
import jwt from 'jsonwebtoken';
import { redis } from '../config/redis.js';


// Signup Controller
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Authenticate user
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Store refresh token in redis
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);


        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log("Failed create an account", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};


// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        };

        const { accessToken, refreshToken } = generateTokens(user._id);

        // Store refresh token in redis
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                cartItems: user.cartItems
            }
        });

    } catch (error) {
        console.log("Failed to login", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Logout Controller
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        };

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ success: true, message: "User logged out successfully" });

    } catch (error) {
        console.log("Failed logout user", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Refresh Token Controller
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "No Refresh Token." });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storeToken = await redis.get(`refresh_token:${decoded.userId}`)

        if (storeToken !== refreshToken) {
            return res.status(400).json({ success: false, message: "Invalid Refresh Token." });
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            // accessToken
        });
    } catch (error) {
        console.log("Failed to refresh the token", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// User Profile Controller
export const userProfile = async (req, res) => {
    try {

        const user = req.user;

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log("Failed to get user profile", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}