import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="logo h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
        Ar
      </div>
      <div className="links flex items-center gap-3 md:gap-6">
        <Link
          className="text-text text-xs md:text-[16px] hover:text-primary"
          to="/#about"
        >
          About
        </Link>
        <Link
          className="text-text text-xs md:text-[16px] hover:text-primary"
          to="/#projects"
        >
          Projects
        </Link>
        <Link
          className="text-text text-xs md:text-[16px] hover:text-primary"
          to="/#skills"
        >
          Skills
        </Link>
        <Link
          className="text-text text-xs md:text-[16px] hover:text-primary"
          to="/#contact"
        >
          Contact
        </Link>
      </div>
      <div className="btns flex items-center md:gap-6 gap-3">
        <ThemeToggle />
        <button className="rounded-full bg-primary hover:bg-secondary hover:text-muted ease-in px-4 py-1 md:text-md md:py-2 text-sm cursor-pointer text-white">
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
