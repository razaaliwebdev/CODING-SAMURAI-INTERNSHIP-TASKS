import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Navbar from "./components/Navbar";
import { useUserStore } from "./store/useUserStore";

const App = () => {
  const { user, checkUser, checkingAuth } = useUserStore();

  useEffect(() => {
    checkUser();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="selection:bg-amber-400 selection:text-black">
      <Toaster />
      <Navbar />
      <div className="md:w-[92%] w-[96%] mx-auto">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
