import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";

import CreateProduct from "../../components/admin/CreateProduct";
import ProductsList from "../../components/admin/ProductsList";
import Analytics from "../../components/admin/Analytics";
import { useProductStore } from "../../store/useProductStore";

const tabs = [
  {
    id: "create",
    title: "Create Product",
    icon: PlusCircle,
  },
  {
    id: "products",
    title: "Products",
    icon: ShoppingBasket,
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart,
  },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("create");

  const { getAllProducts } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="border-r border-orange-200 flex flex-col  md:w-1/5 w-full md:h-screen px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-4 text-3xl font-bold text-orange-500 pb-2"
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex md:flex-col md:justify-start md:items-start justify-center  mx-auto flex-row gap-4 w-full items-center  ">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  className={`cursor-pointer flex items-center gap-2 border border-orange-400 md:px-6 md:py-2 px-4 py-1 rounded text-orange-500 hover:bg-orange-400 hover:text-white transition-all duration-500 ease-in my-2 w-full ${
                    activeTab === tab.id && "bg-orange-400 text-white"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="md:h-6 md:w-6 hidden md:block" />
                  {tab.title}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center">
          {" "}
          {activeTab === "create" && <CreateProduct />}
          {activeTab === "products" && <ProductsList />}
          {activeTab === "analytics" && <Analytics />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
