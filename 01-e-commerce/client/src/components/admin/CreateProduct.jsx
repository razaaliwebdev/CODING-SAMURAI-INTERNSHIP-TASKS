import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";

const categories = [
  "Aerospace & Defence",
  "Medical & Implants",
  "High-Performance Automotive",
  "Industrial Tooling & Molds",
  "Electronics & Housings",
  "Energy & Fluid Control",
];

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const { getAllProducts } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct(newProduct);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file); // base 64
    }
  };

  return (
    <div className="h-full w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:my-4 my-8 bg-gray-50 rounded px-8 py-8">
        <motion.div
          className=""
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="my-4 text-center text-3xl font-bold text-orange-500 pb-2">
            Create New Product
          </h2>
        </motion.div>
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-2">
            {/*Product Name  */}
            <div className="field">
              <label className="block font-medium text-gray-700" htmlFor="name">
                Product Name
              </label>
              <input
                className="block mt-1 w-full py-2 px-4  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
                type="text"
                id="name"
                name="name"
                placeholder="Ac Servo..."
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            {/*Product Description  */}
            <div className="field">
              <label
                className="block font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="block mt-1 w-full py-2 px-4  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg h-28"
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="Specialized, lightweight components for racing and performance...."
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              ></textarea>
            </div>
            {/*Price  */}
            <div className="field">
              <label
                className="block font-medium text-gray-700"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="block mt-1 w-full py-2 px-4  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
                type="number"
                id="price"
                name="price"
                placeholder="14.99"
                step={0.5}
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            {/*Category  */}
            <div className="field">
              <label
                className="block font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="block mt-1 w-full py-2 px-4  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
              >
                <option value="">Select a category</option>
                {categories.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Product Image  */}
            <div className="inline-flex items-center">
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageChange}
                className="sr-only"
                accept="image/*"
              />

              <label
                htmlFor="imageUpload"
                className="flex items-center px-5 py-2 border border-gray-200  text-gray-500 hover:text-orange-400 rounded-lg cursor-pointer  
                                       hover:border-orange-400  transition duration-200 text-sm font-semibold"
              >
                <Upload className="h-4 w-4 inline-block mr-2" />
                {newProduct.image ? "Change Image" : "Select Image"}
              </label>

              {newProduct.image && (
                <span className="ml-4 text-sm text-gray-600 truncate max-w-xs">
                  Image Uploaded
                </span>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center my-4  bg-linear-to-bl from-orange-400 to-orange-500 rounded py-2.5 cursor-pointer hover:bg-linear-to-br text-white gap-1"
            >
              <PlusCircle className={`${loading && "hidden"}`} />
              <span className="">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin" />
                    Loading...
                  </div>
                ) : (
                  "Create Product"
                )}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProduct;
