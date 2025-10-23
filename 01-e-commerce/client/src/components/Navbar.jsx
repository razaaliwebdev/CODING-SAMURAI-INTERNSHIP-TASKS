import React from "react";
import {
  Cog,
  UserPlus,
  LogIn,
  Lock,
  LogOut,
  ShoppingBasket,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let user = false;
  let isAdmin = false;

  return (
    <nav className="md:w-[92%] w-[96%] mx-auto flex items-center justify-between  md:py-4 py-4 border-b border-orange-100">
      <Link to={"/"} className="logo flex items-center gap-1.5">
        <Cog
          className="bg-linear-to-bl from-orange-400 to-orange-500 p-1 rounded text-white"
          size={35}
        />
        <span className="text-lg font-semibold text-orange-500">Precision</span>
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
              0
            </span>
          </Link>
        )}
        {isAdmin && (
          <button className="flex items-center gap-1 bg-linear-to-bl from-orange-400 to-orange-500 md:px-4 md:py-1.5 px-4 py-1 cursor-pointer hover:bg-linear-to-br hover:from-orange-400 hover:to-orange-500 rounded text-white ">
            <Lock className="hidden sm:inline" size={15} />
            <span>Admin</span>
          </button>
        )}

        {user ? (
          <button className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 rounded text-white md:px-4 md:py-1.5 px-4 py-1 cursor-pointer">
            <LogOut />
            <span className="hidden sm:inline" size={10}>
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
    </nav>
  );
};

export default Navbar;
