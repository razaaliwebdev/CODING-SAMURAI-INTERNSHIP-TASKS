import { Github, Linkedin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-secondary md:py-8 py-6 flex items-center justify-between md:flex-row flex-col gap-6">
      <div className="">
        <p className="text-muted text-sm">
          &copy; {new Date().getFullYear()} Haris Mujahid. All rights reserved.
        </p>
      </div>
      <div className="flex gap-4">
        <Link to="http://linkedin.com/in/raza-webdev/">
          <Linkedin className="text-primary cursor-pointer hover:text-text animate-pulse " />
        </Link>
        <Link to="https://github.com/razaaliwebdev">
          <Github className="text-primary cursor-pointer hover:text-text animate-pulse " />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
