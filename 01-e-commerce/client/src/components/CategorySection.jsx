import React from "react";
import { categories } from "../assets/assets";
import { Link } from "react-router-dom";

const CategorySection = () => {
  return (
    <section className="md:py-8 py-4">
      <h2 className="text-center md:text-4xl text-2xl font-bold text-orange-400">
        Explore Our Categories
      </h2>
      <p className="text-center max-w-2xl mx-auto mt-4 text-gray-600">
        Discover a wide range of categories to choose from. From Aerospace to
        Automotive, Medical to Industrial, we have something for everyone.
      </p>

      <div className="grid grid-cols-1 md:my-8 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden h-80 rounded-xl shadow-xl transition duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <Link to={"/category/" + category.name.toLowerCase()}>
              {/* Image Container with Hover Scaling */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                // Fallback for image loading error
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/94a3b8/0f172a?text=Image+Missing";
                }}
              />

              {/* Text Overlay for Readability and Aesthetic */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:text-orange-400">
                  {category.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
