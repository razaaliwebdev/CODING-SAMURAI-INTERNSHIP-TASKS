import React, { useEffect } from "react";
import { XCircle, ArrowLeft, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const PurchaseCancel = () => {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutCancel = async (sessionId) => {
      try {
        // optional: notify backend about cancellation
        await axiosInstance.post(`/payments/checkout-cancel`, {
          sessionId,
        });

        // clear cart locally
        clearCart();
        toast.error("Your payment was cancelled.");
      } catch (error) {
        console.error("Error processing checkout cancel:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while processing your cancellation."
        );
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) handleCheckoutCancel(sessionId);
  }, [clearCart]);

  return (
    <div className="h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-gray-400 text-center mb-2">
            It seems you cancelled your payment. Don’t worry — your cart is still safe!
          </p>
          <p className="text-red-400 text-center text-sm mb-6">
            You can retry checkout anytime.
          </p>

          <div className="bg-gray-100 rounded p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Cancellation Time:
              </span>
              <span className="text-gray-900 font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Need help with your order?
              </span>
              <span className="text-sm font-semibold text-red-400">
                Contact Support
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-all duration-500 cursor-pointer flex items-center justify-center gap-2"
            >
              <Frown size={18} /> Go Back to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-black hover:opacity-80 text-red-400 font-bold py-2 px-6 rounded transition-all duration-500 cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCancel;
