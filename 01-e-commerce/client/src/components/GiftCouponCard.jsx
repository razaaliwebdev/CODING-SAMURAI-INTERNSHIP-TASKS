import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied } = useCartStore();

  const handleRemoveCoupon = () => {
    console.log("remove coupon");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mx-12 border h-55 w-sm border-gray-400 p-4 rounded hover:border-orange-400 hover:shadow-sm"
    >
      <p className="text-center text-gray-500">
        Do you have a voucher or gift card?
      </p>
      <input
        value={userInputCode}
        onChange={(e) => setUserInputCode(e.target.value)}
        type="text"
        placeholder="Enter coupon code"
        className="block my-2 w-full px-3 py-2 pl-10  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-linear-to-bl from-orange-400 to-orange-500 rounded hover:bg-linear-to-br px-6 py-2 my-2 text-white w-full cursor-pointer"
      >
        Apply Coupon
      </motion.button>
      <h3 className="font-medium text-gray-500">Your Available Coupon:</h3>
      {isCouponApplied && coupon && (
        <div className="">
          <p className="text-sm text-gray-500">
            GIFT -{" "}
            <span className="">
              {coupon.code} - {coupon.discountPercentage}% off
            </span>
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 rounded px-4 py-1 my-2 text-white cursor-pointer"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
