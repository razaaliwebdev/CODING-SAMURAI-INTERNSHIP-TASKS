import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20); // toggle blur after 20px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="flex items-center justify-between py-4 sticky px-2.5 top-0 backdrop:blur-2xl z-50  ">
      <div
        className="logo h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary cursor-pointer font-semibold text-lg"
        onClick={() => navigate("/")}
      >
        HM
      </div>
      <div className="links md:flex items-center hidden md:gap-6">
        <Link
          className="text-text text-sm md:text-[16px] hover:text-primary"
          to="/#about"
        >
          About
        </Link>
        <Link
          className="text-text text-sm md:text-[16px] hover:text-primary"
          to="/#projects"
        >
          Projects
        </Link>
        <Link
          className="text-text text-sm md:text-[16px] hover:text-primary"
          to="/#skills"
        >
          Skills
        </Link>
        <Link
          className="text-text text-sm md:text-[16px] hover:text-primary"
          to="/#contact"
        >
          Contact
        </Link>
      </div>
      <div className="btns flex items-center md:gap-6 gap-4">
        <ThemeToggle />
        <button
          onClick={() => navigate("/#contact")}
          className="rounded-full bg-primary hover:bg-secondary hover:text-muted ease-in md:px-6 px-4 py-1.5 md:text-md md:py-2  cursor-pointer text-white"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
