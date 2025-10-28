import Product from "../models/productModel.js";
import User from '../models/userModel.js';


// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        // Fetch user and ensure it exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Find if item already exists
        const existingItem = user.cartItems.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ product: productId, quantity: 1 });
        }

        await user.save();

        // Re-fetch with populated products
        const updatedUser = await User.findById(userId).populate("cartItems.product");

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully.",
            cartItems: updatedUser.cartItems,
        });
    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get Cart Products
export const getCartProducts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("cartItems.product");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cart = user.cartItems;
        const subTotal = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
        const total = subTotal; // adjust here if coupons/taxes apply

        return res.status(200).json({
            success: true,
            cart,
            subTotal,
            total,
        });
    } catch (error) {
        console.log("Error in getCartProducts", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Remove all from the cart
export const removeAllFromCart = async (req, res) => {
    try {
        const { id } = req.body; // id = productId to remove; if absent, clear all
        const user = req.user;

        if (!id) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter((item) => item.product.toString() !== id);
        }
        await user.save();

        const updatedUser = await User.findById(user._id).populate("cartItems.product");

        return res.status(200).json({
            success: true,
            message: "Cart items removed successfully",
            cartItems: updatedUser.cartItems,
        })
    } catch (error) {
        console.log("Error in removeAllFromCart", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Update Quantity Controller 
export const updateQuantity = async (req, res) => {
    try {
        const { id } = req.params; // id = productId

        const { quantity } = req.body;

        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.product.toString() === id);

        if (existingItem) {
            if (quantity <= 0) {
                user.cartItems = user.cartItems.filter((item) => item.product.toString() !== id);
                await user.save();

                const updatedUser = await User.findById(user._id).populate("cartItems.product");
                return res.status(200).json({ cartItems: updatedUser.cartItems });
            }
            existingItem.quantity = quantity;
            await user.save();
            const updatedUser = await User.findById(user._id).populate("cartItems.product");
            return res.status(200).json({ cartItems: updatedUser.cartItems });
        } else {
            return res.status(404).json({
                success: false,
                messag: "Items not found in the cart."
            })
        }

    } catch (error) {
        console.log("Error in update quantity", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}