import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import Confetti from "react-confetti";

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const res = await axiosInstance.post(`payments/checkout-success`, {
          sessionId: sessionId,
        });
        clearCart();
      } catch (error) {
        console.error("Error processing checkout success:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while processing your order."
        );
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
    }
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Processing your order...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center px-6">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
        
      />

      <div className="max-w-md w-full bg-white p-8 rounded shadow relative z-10">
        <div className="p-6 sm:p-8 ">
          <div className="flex justify-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold  text-center text-orange-400 mb-2">
            Purchase Successful!
          </h1>
          <p className="text-gray-300 text-center mb-2">
            Thanks you for your order. {"We're"} processing it now.
          </p>
          <p className="text-orange-400 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="bg-gray-100 rounded p-4 mb-6">
            <div className="flex items-center  justify-between">
              <span className="font-medium text-gray-700">Order Number:</span>
              <span className="text-gray-900 font-semibold">#123456789</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated Devlivery</span>
              <span className="text-sm font-semibold text-orange-400">
                3-4 business days
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white  font-bold  py-2 px-6 rounded transition-all duration-500 cursor-pointer flex items-center  justify-center">
              <HandHeart className="mr-2 " size={18} /> Thanks for trusting us!
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-black hover:opacity-80 text-orange-400  font-bold  py-2 px-6 rounded transition-all duration-500 cursor-pointer flex items-center justify-center gap-2"
            >
              Continue Shopping <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
