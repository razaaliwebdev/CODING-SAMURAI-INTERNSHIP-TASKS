import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[75vh] w-full flex justify-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <ShoppingCart className="md:h-28 md:w-28 h-16 w-16 text-orange-400" />
        <h2 className="md:text-2xl text-xl font-medium text-gray-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Looks like you haven't added anything to cart yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-linear-to-bl from-orange-400 to-orange-500 rounded py-2 px-6 cursor-pointer hover:bg-linear-to-br text-white"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
