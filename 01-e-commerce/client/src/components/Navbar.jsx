import React from "react";
import {
  Cog,
  UserPlus,
  LogIn,
  Lock,
  LogOut,
  ShoppingBasket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  let { user, logout } = useUserStore();
  let isAdmin = user?.role === "admin";

  const navigate = useNavigate();

  const { cart } = useCartStore();

  return (
    <nav className="">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-[92%] w-[96%] mx-auto flex items-center justify-between  md:py-4 py-4 border-b border-orange-100"
      >
        <Link to={"/"} className="logo flex items-center gap-1.5">
          <Cog
            className="bg-linear-to-bl from-orange-400 to-orange-500 p-1 rounded text-white"
            size={35}
          />
          <span className="text-lg font-semibold text-orange-500">
            Precision
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to={"/"}
            className="text-orange-400 hover:text-orange-500 transition-all duration-500 ease-in"
          >
            Home
          </Link>
          {user && (
            <Link
              to={"/cart"}
              className="relative text-orange-400 hover:text-orange-500 transition-all duration-500 ease-in"
            >
              <ShoppingBasket />
              <span className="quantity absolute -top-3 -right-3 text-xs bg-linear-to-bl from-orange-400 to-orange-500 h-4 w-4 rounded-full text-white flex items-center justify-center ">
                {cart.length}
              </span>
            </Link>
          )}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="flex items-center gap-1 bg-linear-to-bl from-orange-400 to-orange-500 md:px-4 md:py-1.5 px-4 py-1 cursor-pointer hover:bg-linear-to-br hover:from-orange-400 hover:to-orange-500 rounded text-white "
            >
              <Lock className="hidden sm:inline" size={15} />
              <span>Admin</span>
            </button>
          )}

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 rounded text-white md:px-4 md:py-1.5 px-4 py-1 cursor-pointer"
            >
              <LogOut className="hidden sm:inline" />
              <span className="" size={10}>
                Logout
              </span>
            </button>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="flex items-center gap-1 bg-linear-to-bl from-orange-400 to-orange-500 md:px-4 md:py-1.5 px-4 py-1 cursor-pointer hover:bg-linear-to-br hover:from-orange-400 hover:to-orange-500 rounded text-white"
              >
                <UserPlus className="hidden sm:inline" size={20} /> Sign Up
              </Link>
              <Link
                to={"/login"}
                className="flex items-center gap-1 bg-linear-to-bl from-orange-400 to-orange-500 md:px-4 md:py-1.5 px-4 py-1 cursor-pointer hover:bg-linear-to-br hover:from-orange-400 hover:to-orange-500 rounded text-white"
              >
                <LogIn className="hidden sm:inline" size={20} /> Login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
