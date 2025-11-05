// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Get current section from URL hash
  const currentHash = location.hash.replace("#", "") || "home";

  return (
    <nav
      className={`flex items-center justify-between py-4 sticky top-0 z-50 px-2.5 transition-all duration-300 ${
        scroll ? "backdrop-blur-xl bg-bg/80" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div
        className="logo h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary cursor-pointer font-semibold text-lg"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        HM
      </div>

      {/* Navigation Links */}
      <div className="links md:flex items-center hidden md:gap-8">
        {["about", "projects", "skills", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`capitalize cursor-pointer text-sm md:text-base font-medium transition-all duration-200
              ${
                currentHash === section
                  ? "text-primary underline underline-offset-4 decoration-2"
                  : "text-text hover:text-primary"
              }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Right Side: Theme + CTA */}
      <div className="btns flex items-center md:gap-6 gap-4">
        <ThemeToggle />
        <button
          onClick={() => scrollToSection("contact")}
          className="rounded-full bg-primary hover:bg-secondary hover:text-muted transition-all duration-300 ease-in-out md:px-6 px-4 py-1.5 md:text-md md:py-2 cursor-pointer text-white font-medium"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
