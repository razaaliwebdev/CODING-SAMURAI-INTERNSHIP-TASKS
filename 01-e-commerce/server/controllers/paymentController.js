import Order from '../models/orderModel.js';
import Coupon from '../models/couponModel.js';
import { stripe } from '../config/stripe.js';
import { createStripeCoupon } from '../utils/createStripeCoupon.js';
import { createNewCoupon } from '../utils/createNewCoupon.js';



// createCheckoutSession Controller
export const createCheckoutSession = async (req, res) => {
    try {

        const { products, couponCode } = req.body

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No products found in the cart"
            })
        };

        let totalAmount = 0;

        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100);   // Stripe want you to send in the format of cents
            totalAmount += amount * product.quantity;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                }
            }
        });

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: User._id, isActive: true });
            if (coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        };

        const session = await stripe.checkout.sessions.create(
            {
                payment_method_types: ["cart"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
                discounts: coupon ? [
                    {
                        coupon: await createStripeCoupon(coupon.discountPercentage)
                    }
                ] : [],
                metadata: {
                    userId: req.user._id.toString(),
                    couponCode: couponCode || "",
                    products: JSON.stringify(
                        products.map((p) => ({
                            id: p._id,
                            quantity: p.quantity,
                            price: p.price
                        }))
                    )
                }
            }
        );

        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id);
        }

        return res.status(200).json({
            id: session.id,
            totalAmount: totalAmount / 100
        });

    } catch (error) {
        console.log("Failed to create checkout session", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// Checkout Success Controller
export const checkoutSuccess = async (req, res) => {
    try {

        const sessionId = req.body;

        const session = await stripe.checkout.session.retrieve(sessionId);

        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode, userId: session.metadata.userId
                    },
                    { isActive: false }
                )
            }
        };

        // Create new order
        const products = JSON.parse(session.metadata.products);

        const newOrder = await Order.create({
            user: session.metadata.userId,
            products: products.map((product) => ({
                product: product.id,
                quantity: product.quantity,
                price: product.price
            })),
            totalAmount: session.amount_total / 100,
            // paymentIntent: session.amount_intent,
            stripeSessionId: sessionId
        });

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        console.log("Failed to create checkout session", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
