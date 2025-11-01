import Order from '../models/orderModel.js';
import Coupon from '../models/couponModel.js';
import { stripe } from '../config/stripe.js';
import { createStripeCoupon } from '../utils/createStripeCoupon.js';
import { createNewCoupon } from '../utils/createNewCoupon.js';






export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No products found in the cart",
            });
        }

        // console.log("🧾 Incoming Products:", products);

        // --- FIX 1: Prepare lightweight product data for metadata ---
        const lightweightProducts = products.map((item) => {
            const product = item.product || item; // handle nested object case
            const price = parseFloat(product.price);

            if (isNaN(price)) {
                throw new Error(`Invalid price for product: ${product.name}`);
            }

            // Store only essential data to avoid hitting Stripe's metadata size limit
            return {
                id: product._id,
                quantity: item.quantity,
                price: price
            };
        });

        // ✅ Build Stripe line items
        const lineItems = products.map((item) => {
            const product = item.product || item; // handle nested object case
            const price = parseFloat(product.price);

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: Math.round(price * 100), // cents
                },
                quantity: item.quantity,
            };
        });

        // ✅ Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            metadata: {
                userId: req.user?._id?.toString() || "guest",
                // FIX 2: Store the lightweight product array as a JSON string
                products: JSON.stringify(lightweightProducts),
                couponCode: couponCode || undefined, // Store coupon code if present
            },
        });

        // ✅ Send URL to frontend
        return res.status(200).json({
            success: true,
            url: session.url,
        });
    } catch (error) {
        console.error("Failed to create checkout session", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};



export const checkoutSuccess = async (req, res) => {
    try {
        // 1. FIX: Extract the Session ID safely (Handles previous [object Object] error)
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Stripe Session ID in request body."
            });
        }

        // 2. Retrieve the Stripe session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // 3. Check for payment and handle coupon
        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId
                    },
                    { isActive: false }
                );
            }
        };

        // 4. FIX: Safely parse the product data from metadata (Handles "undefined" is not valid JSON error)
        let products = [];
        const productsMetadata = session.metadata.products;

        if (productsMetadata) {
            // This now safely parses the JSON string created in createCheckoutSession
            products = JSON.parse(productsMetadata);
        } else {
            // Fallback/Error log for missing product data
            console.error("CRITICAL ERROR: Products array not found in session metadata. Order may be incomplete.");
        }

        // 5. Create new order
        const newOrder = await Order.create({
            user: session.metadata.userId,
            products: products.map((product) => ({
                // Using the lightweight structure: {id, quantity, price}
                product: product.id,
                quantity: product.quantity,
                price: product.price
            })),
            totalAmount: session.amount_total / 100,
            stripeSessionId: sessionId
        });

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        // Log the actual error for debugging
        console.error("Failed to process checkout success:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
