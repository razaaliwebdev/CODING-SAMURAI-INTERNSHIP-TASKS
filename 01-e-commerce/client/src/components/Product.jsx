import React from "react";
import { toast } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const Product = ({ product }) => {
  const { user } = useUserStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add product to cart");
      return;
    } else {
      toast.success("Product added to cart successfully");
    }
  };

  return (
    <div className="border border-gray-300 p-4 w-sm rounded hover:border-orange-300 hover:shadow-sm shadow-orange-400">
      <img src={product.image} className="rounded" alt={product.name} />
      <h2 className="my-2 text-lg font-semibold text-gray-700">
        {product.name}
      </h2>
      <p className="my-2 font-medium text-gray-600">${product.price}</p>
      <button
        className="flex items-center gap-2 px-6 py-1.5 rounded bg-orange-400 cursor-pointer text-white my-4"
        onClick={handleAddToCart}
      >
        {" "}
        <ShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default Product;
