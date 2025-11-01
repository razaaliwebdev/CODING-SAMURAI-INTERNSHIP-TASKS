import { ShoppingCart } from "lucide-react";
import React from "react";
import { useCartStore } from "../store/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const { addToCart } = useCartStore();

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold text-orange-400">
        Featured Products
      </h1>
      <div className="flex items-center justify-center gap-6 overflow-x-auto my-4">
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="w-72 h-80 border border-gray-300 rounded hover:border-orange-400 p-4"
          >
            <div className="w-full h-1/2">
              <img
                src={product.image}
                className="w-full h-full object-cover rounded"
                alt={product.title}
              />
            </div>
            <h2 className="my-2 text-xl font-medium ">{product.name}</h2>
            <p className="text-sm font-semibold">${product.price}</p>
            <button
              className="flex items-center gap-2 px-6 py-1.5 rounded bg-orange-400 cursor-pointer text-white my-6"
              onClick={() => addToCart(product)}
            >
              {" "}
              <ShoppingCart /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
