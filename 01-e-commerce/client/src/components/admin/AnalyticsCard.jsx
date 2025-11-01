import React from "react";
import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value, icon: Icon, color = "orange" }) => {
  const colorMap = {
    orange: "from-orange-400 to-orange-500 text-orange-500",
    blue: "from-blue-400 to-blue-500 text-blue-500",
    green: "from-green-400 to-green-500 text-green-500",
    purple: "from-purple-400 to-purple-500 text-purple-500",
    red: "from-red-400 to-red-500 text-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded border border-orange-200 my-4 overflow-hidden p-5 border border-gray-100 bg-white transition-all duration-300`}
    >
      {/* Accent Background Blur */}
      <div
        className={`absolute text-orange-400  inset-0 bg-gradient-to-tr ${colorMap[color]} opacity-10 blur-2xl`}
      />

      {/* Content */}
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p
            className={`text-sm  text-orange-400 font-medium ${colorMap[color]}`}
          >
            {title}
          </p>
          <h3 className="text-3xl text-orange-400  font-bold text-gray-800 mt-1">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div
          className={`p-3 rounded-xl  bg-gradient-to-br ${colorMap[color]} text-orange-300`}
        >
          <Icon className={`w-12 h-12 ${colorMap[color]}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
