import React from "react";
import { useProductStore } from "../../store/useProductStore";
import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";

const ProductsList = () => {
  const {
    deleteProduct,
    toggleFeaturedProduct,
    getAllProduct,
    products,
  } = useProductStore();

  console.log(products);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-gray-300 mt-4 rounded">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.products?.map((product) => {
            console.log("hello");
            return (
              <tr key={product._id} className="">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className=" rounded-md h-14 w-14">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-600 truncate text-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    ${product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={`p-2 rounded-full ${
                      product.isFeature
                        ? "bg-orange-400 text-white"
                        : "bg-gray-200 text-gray-600"
                    } transition-all hover:bg-orange-400 hover:text-white duration-500 ease-in cursor-pointer`}
                    onClick={() => toggleFeaturedProduct(product._id)}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
