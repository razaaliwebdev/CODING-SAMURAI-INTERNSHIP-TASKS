import React, { useState } from "react";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../../store/useUserStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);

    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="flex justify-center md:py-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:my-4 my-8 bg-gray-50 rounded px-8 py-8">
        <motion.div
          className=""
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="my-4 text-center text-3xl font-bold text-orange-500 pb-2">
            Create your account
          </h2>
        </motion.div>
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Name  */}
            <div className="field">
              <label htmlFor="name" className="block font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1 relative rounded">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="block w-full px-3 py-2 pl-10  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
                />
              </div>
            </div>
            {/* Email */}
            <div className="field">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@gmail.com"
                  className="block w-full px-3 py-2 pl-10  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
                />
              </div>
            </div>
            {/* Password */}
            <div className="field">
              <label
                htmlFor="password"
                className="block font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="●●●●●●●●"
                  className="block w-full px-3 py-2 pl-10  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
                />
              </div>
            </div>
            {/* Confirm Password */}
            <div className="field">
              <label
                htmlFor="confirmPassword"
                className="block font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="●●●●●●●●"
                  className="block w-full px-3 py-2 pl-10  border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-lg"
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center my-4  bg-linear-to-bl from-orange-400 to-orange-500 rounded py-2.5 cursor-pointer hover:bg-linear-to-br text-white gap-1"
            >
              <UserPlus className={`${loading && "hidden"}`} />
              <span className="">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin" />
                    Loading...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2">
              <p className="">Already have an account?</p>
              <Link
                to={"/login"}
                className="text-orange-400 flex items-center gap-1 hover:text-orange-500"
              >
                Login Here <ArrowRight size={20} />
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
