import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex items-center justify-between gap-10 my-8 w-4xl">
      <div className="flex gap-6 w-md">
        <div className="h-36 w-36 rounded">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover rounded"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-lg">{item.product.name}</h3>
          <p className="text-gray-600">{item.product.description}</p>
          <button
            className="cursor-pointer"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash className="text-red-400 hover:text-red-500 transition-all duration-500 ease-in-out" />
          </button>
        </div>
      </div>
      <div className="btns flex items-center  gap-2.5">
        <button
          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
          className="border border-orange-400 rounded hover:border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in hover:text-white text-sm"
        >
          <Minus />
        </button>
        <span className="text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
          className="border border-orange-400 rounded hover:border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in hover:text-white text-sm"
        >
          <Plus />
        </button>
      </div>
      <div className="price">
        <span className="font-semibold text-lg text-orange-400">
          ${Math.round(item.product.price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
