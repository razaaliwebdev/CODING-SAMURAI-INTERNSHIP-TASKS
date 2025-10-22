import { redis } from "../config/redis.js";
import Product from "../models/productModel.js"


export const updateFeaturedProductsCache = async () => {
    try {

        const featuredProduct = await Product.find({ isFeature: true }).lean();
        // await redis.set("featured_products", JSON.stringify(featuredProduct), { ex: 60 }, { nx: true });
        await redis.set("featured_products", JSON.stringify(featuredProduct));
    } catch (error) {
        console.log("Failed to update cache", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}