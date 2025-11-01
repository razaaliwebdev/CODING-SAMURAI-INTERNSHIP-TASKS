import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51SEFS04pGrDG2bXnCELPKjTNmE5y3JBFENZNJCsd4vn1eJxReKvlXvy2OeM9wR6RBuSom5AvmIZyc0hiZ1QPm2iy00LQr7M54s"
);

const OrderSummary = () => {
  const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subTotal - total;
  const formattedSubTotal = subTotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  // const handleStripPayment = async () => {
  //   const stripe = await stripePromise;
  //   const res = await axiosInstance.post(`/payments/create-checkout-session`, {
  //     products: cart,
  //     coupon: coupon ? coupon.code : null,
  //   });

  //   const session = res.data;
  //   const result = await stripe.redirectToCheckout({ sessionId: session.id });
  //   if(result.error){
  //     console.log(result.error.message);
  //   }
  // };

  // OrderSummary.jsx (or wherever handleStripPayment is located)

  const handleStripPayment = async () => {
    // 1. Get the session data and URL from your server
    const res = await axiosInstance.post(`/payments/create-checkout-session`, {
      products: cart,
      coupon: coupon ? coupon.code : null,
    });

    const sessionData = res.data;

    if (sessionData.success && sessionData.url) {
      window.location.href = sessionData.url;
    } else {
      console.error("Failed to get Stripe Checkout URL:", sessionData.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="m-12 border h-55 w-sm border-gray-400 p-4 rounded hover:border-orange-400 hover:shadow-sm"
    >
      <h4 className="text-lg font-medium text-center text-gray-600">
        Order Summary
      </h4>
      <div className="border-b border-gray-400 mt-6 mb-1     flex items-center justify-between w-full pb-1">
        <p className="font-medium">Orignal Price</p>
        <p className="">${formattedSubTotal}</p>
      </div>
      {savings > 0 && (
        <div className="total flex items-center justify-between w-full pb-1">
          <p className="font-semibold text-orange-400">Total</p>
          <p className="font-medium text-orange-400">${formattedSavings}</p>
        </div>
      )}

      {coupon && isCouponApplied && (
        <div className="flex items-center justify-between gap-4">
          <p className="">Coupon ({coupon.code})</p>
          <p className="">-{coupon.discountPercentage}%</p>
        </div>
      )}
      <div className="total flex items-center justify-between w-full pb-1">
        <p className="font-semibold text-orange-400">Total</p>
        <p className="font-medium text-orange-400">${formattedSubTotal}</p>
      </div>

      <motion.button
        onClick={handleStripPayment}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-linear-to-bl from-orange-400 to-orange-500 rounded hover:bg-linear-to-br px-6 py-2 my-2 text-white w-full cursor-pointer"
      >
        Proceed to Checkout
      </motion.button>
      <p className="flex items-center gap-2 justify-center">
        or{" "}
        <Link
          to={"/"}
          className="flex text-orange-400 hover:text-orange-500 items-center hover:underline gap-2"
        >
          Continue Shopping <ArrowRight />
        </Link>
      </p>
    </motion.div>
  );
};

export default OrderSummary;
