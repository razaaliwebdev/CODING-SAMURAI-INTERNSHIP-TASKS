import Product from '../models/productModel.js';
import { redis } from '../config/redis.js';
import cloudinary from '../config/cloudinary.js';
import { updateFeaturedProductsCache } from '../utils/updateFeaturedProductsCache.js';



// Create Product Controller
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        if (!name || !price || !image || !category) {
            return res.status(400).json({
                success: false,
                message: "Name , price , image and category are required fields"
            })
        };

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse?.secure_url : "",
            category
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })

    } catch (error) {
        console.log("Failed to create product", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Get All Products Controller
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) return res.status(404).json({ success: false, message: "No products found" });

        return res.status(200).json({
            products,
            success: true,
            message: "Products fetched successfully",
        })
    } catch (error) {
        console.log("Failed to get all products", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Featured Products Controller
export const getFeaturedProducts = async (req, res) => {
    try {

        let featureProducts = await redis.get("featured_products");
        if (featureProducts) {
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                products: JSON.parse(featureProducts)
            })
        };

        // If not in Redis , fetch from the MONGODB
        featureProducts = await Product.find({ isFeature: true }).lean();

        if (!featureProducts) {
            return res.status(404).json({
                message: 'No feature products found'
            })
        };

        // Store in REDIS for future quick access.
        await redis.set("featured_products", JSON.stringify(featureProducts));

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: featureProducts
        })

    } catch (error) {
        console.log("Failed to get featured products", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// Delete Product Controller
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy("products/" + publicId);
                console.log("Deleted image from the Cloudinary.");
            } catch (error) {
                console.log("Failed to Delete Product image", error);
            }
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.log("Failed to delete the product.", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};



// Get Recommended Products Controller
export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 3 } }, // randomly pick 3 products
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                },
            },
        ]);

        if (products.length === 0)
            return res
                .status(404)
                .json({ success: false, message: "No products found" });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        console.log("Failed to fetch recommended products", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



// Get Products By Categories
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const products = await Product.find({ category });

        if (!products || products.length === 0) return res.status(404).json({ success: false, message: "No products found" });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products
        })

    } catch (error) {
        console.log("Failed fetch products by category", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Update Product Controller
export const toggleFeatrureProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        if (product) {
            product.isFeature = !product.isFeature;
            await product.save();
            const updateProduct = await product.save();

            await updateFeaturedProductsCache();

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                product: updateProduct
            })

        } else {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

    } catch (error) {
        console.log("Failed to update product", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}