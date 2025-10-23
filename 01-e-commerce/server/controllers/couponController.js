import Coupon from "../models/couponModel.js";


// Get Coupon Controller
export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive });

        return res.status(200).json(coupon || null);

    } catch (error) {
        console.log("Failed to get coupon", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// Validate Coupon
export const validateCoupon = async (req, res) => {
    try {

        const { code } = req.body;

        const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        };

        if (coupon.expirationDate < Date.now()) {
            coupon.isActive = false;
            await coupon.save();
        };
        return res.status(200).json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log("Error in validate coupon.", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}