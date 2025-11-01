import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import EmptyCart from "../../components/EmptyCart";
import { useCartStore } from "../../store/useCartStore";
import { ArrowRight } from "lucide-react";
import OrderSummary from "../../components/OrderSummary";
import GiftCouponCard from "../../components/GiftCouponCard";
import PeopleAlsoBought from "../../components/PeopleAlsoBought";

const Cart = () => {
  const { cart } = useCartStore();

  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Cart Items */}
        {cart.length <= 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex-1">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="w-full md:w-[400px] lg:w-[400px] flex flex-col">
            <OrderSummary />
            {/* <GiftCouponCard /> */}
          </div>
        )}
      </div>

      {/* People Also Bought */}
      {cart.length > 0 && <PeopleAlsoBought />}
    </div>
  );
};

export default Cart;

// import { Link } from "react-router-dom";
// import CartItem from "../../components/CartItem";
// import EmptyCart from "../../components/EmptyCart";
// import { useCartStore } from "../../store/useCartStore";
// import { ArrowRight } from "lucide-react";
// import OrderSummary from "../../components/OrderSummary";
// import GiftCouponCard from "../../components/GiftCouponCard";
// import PeopleAlsoBought from "../../components/PeopleAlsoBought";

// const Cart = () => {
//   const { cart } = useCartStore();
//   //   const cart = [];

//   console.log(cart);

//   return (
//     <div className="py-8 md:py-14">
//       <div className="flex justify-between gap-6">
//         {cart.length <= 0 ? (
//           <EmptyCart />
//         ) : (
//           <div className="">
//             {cart.map((item) => (
//               <CartItem key={item._id} item={item} />
//             ))}
//           </div>
//         )}
//         {cart.length > 0 && (
//           <div className="flex flex-col">
//             <OrderSummary />
//             {/* <GiftCouponCard /> */}
//           </div>
//         )}
//       </div>
//       {cart.length > 0 && <PeopleAlsoBought />}
//     </div>
//   );
// };

// export default Cart;
