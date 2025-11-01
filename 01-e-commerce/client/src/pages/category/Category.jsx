import React, { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore.js";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Product from "../../components/Product.jsx";

const Category = () => {
  const { getProductsByCategory, products } = useProductStore();

  const { category } = useParams();
  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  useEffect(() => {
    getProductsByCategory(category);
  }, [category, getProductsByCategory]);

  console.log(products);

  return (
    <div className="h-full w-full md:py-16 py-8">
      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center capitialize text-4xl font-bold text-orange-400"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>
        {products.length === 0 && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-4 text-gray-600 text-lg font-medium"
          >
            No products found in this category.
          </motion.h2>
        )}
        <div className="grid grid-cols-1 md:my-8 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productList.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
