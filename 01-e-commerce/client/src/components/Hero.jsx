import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="">
      <div className="relative h-[85vh] md:h-[90vh] overflow-hidden rounded-xl shadow-2xl mx-auto my-6 max-w-8xl">
        <img
          src={assets.hero}
          alt="Advanced CNC Machining in Action"
          className="h-full w-full object-cover bg-center transition-transform duration-500 hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gray-900 opacity-60 rounded-xl"></div>

        {/* Hero Content (Heading, Paragraph, Buttons) */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="max-w-4xl text-center text-white">
            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-lg">
              Precision Engineering. Limitless Possibilities.
            </h1>

            {/* Paragraph */}
            <p className="text-lg sm:text-xl md:text-2xl mb-10 font-light drop-shadow-md max-w-3xl mx-auto">
              We deliver industrial-grade CNC components across Aerospace,
              Medical, and Energy sectors with unmatched quality and accuracy.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-orange-400 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 text-lg cursor-pointer">
                Get a Free Quote
              </button>

              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:bg-white hover:text-orange-400 active:scale-95 text-lg cursor-pointer">
                Explore Our Capabilities
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
