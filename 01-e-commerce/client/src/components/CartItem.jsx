import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-10 my-8 w-full">
      {/* Left section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
        <div className="h-32 w-32 sm:h-36 sm:w-36 rounded mx-auto sm:mx-0">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover rounded"
          />
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h3 className="font-medium text-lg">{item.product.name}</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            {item.product.description}
          </p>
          <button
            className="cursor-pointer mx-auto sm:mx-0"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash className="text-red-400 hover:text-red-500 transition-all duration-500 ease-in-out" />
          </button>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="btns flex items-center justify-center sm:justify-start gap-2.5 mt-4 sm:mt-0">
        <button
          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
          className="border border-orange-400 rounded hover:border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in hover:text-white text-sm p-1"
        >
          <Minus />
        </button>
        <span className="text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
          className="border border-orange-400 rounded hover:border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in hover:text-white text-sm p-1"
        >
          <Plus />
        </button>
      </div>

      {/* Price */}
      <div className="price mt-3 sm:mt-0">
        <span className="font-semibold text-lg text-orange-400">
          ${Math.round(item.product.price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;

// import { Minus, Plus, Trash } from "lucide-react";
// import React from "react";
// import { useCartStore } from "../store/useCartStore";

// const CartItem = ({ item }) => {
//   const { removeFromCart, updateQuantity } = useCartStore();

//   return (
//     <div className="flex items-center justify-between gap-10 my-8 w-4xl">
//       <div className="flex gap-6 w-md">
//         <div className="h-36 w-36 rounded">
//           <img
//             src={item.product.image}
//             alt={item.product.name}
//             className="h-full w-full object-cover rounded"
//           />
//         </div>
//         <div className="flex flex-col gap-3">
//           <h3 className="font-medium text-lg">{item.product.name}</h3>
//           <p className="text-gray-600">{item.product.description}</p>
//           <button
//             className="cursor-pointer"
//             onClick={() => removeFromCart(item._id)}
//           >
//             <Trash className="text-red-400 hover:text-red-500 transition-all duration-500 ease-in-out" />
//           </button>
//         </div>
//       </div>
//       <div className="btns flex items-center  gap-2.5">
//         <button
//           onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
//           className="border border-orange-400 rounded hover:border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in hover:text-white text-sm"
//         >
//           <Minus />
//         </button>
//         <span className="text-sm">{item.quantity}</span>
//         <button
//           onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
//           className="border border-orange-400 rounded hover:border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-400 transition-all duration-500 ease-in hover:text-white text-sm"
//         >
//           <Plus />
//         </button>
//       </div>
//       <div className="price">
//         <span className="font-semibold text-lg text-orange-400">
//           ${Math.round(item.product.price)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
