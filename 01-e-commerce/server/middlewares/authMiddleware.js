
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'


// Protect Route
export const protect = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No access token provided"
            })
        };

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - User not found"
                })
            }

            req.user = user;
        } catch (error) {
            if (error.name === "TokenExpireError") {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - Access token expired"
                })
            }
            throw error;
        }

        next();

    } catch (error) {
        console.log("Error in protect middleware", error);
        return res.status(401).json({ success: false, message: "Invalid access token." });
    }
}



// Admin
export const admin = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access Denied - Admin Only"
        })
    }
}


