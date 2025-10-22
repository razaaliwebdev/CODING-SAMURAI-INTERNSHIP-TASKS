import Product from "../models/productModel.js";


// Cart Controller
export const addToCart = async (req, res) => {
    try {

        const { id } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push(id)
        }

        await user.save();

        return res.status(200).json({
            success: false,
            message: "Add to cart items successfully.",
            cartItems: user.cartItems
        })

    } catch (error) {
        console.log("Error in addToCart", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// Get Cart Products 
export const getCartProducts = async (req, res) => {
    try {

        const products = await Product.find({ _id: { $in: req.user.cartItems } });

        // Add Quantity for each product
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItems => cartItems.id === product._id));
            return { ...product.toJSON(), quantity: item.quantity };
        });

        return res.status(200).json({
            success: true,
            cartItems
        })

    } catch (error) {
        console.log("Error in getCartProducts", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// Remove all from the cart
export const removeAllFromCart = async (req, res) => {
    try {
        const { id } = req.body;
        const user = req.user;

        if (!id) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id === id);
        }
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Cart items removed successfully",
            cartItems: user.cartItems
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
        const { id } = req.params;

        const { quantity } = req.body;

        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === id);

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== id);
                await user.save();

                return res.status(200).json({
                    cartItems: user.cartItems
                })
            }
            existingItem.quantity = quantity;
            await user.save();
            return res.status(200).json(user.cartItems);
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