import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import logining from "../assets/authimg.png";


const Login = ({ setIsLoggedIn, setUsername, setIsAdmin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      // Send login request
      const { data } = await axios.post("/api/login", formData);

      // Decode the token to get user details
      const decodedToken = JSON.parse(atob(data.token.split(".")[1]));

      // Set login states
      setIsLoggedIn(true);
      setUsername(decodedToken.username);
      setIsAdmin(decodedToken.role === "admin");

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Show success toast and navigate
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      // Show error toast on failure
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 flex space-x-10"
      >
        {/* Illustration Section */}
        <div className="hidden lg:block w-1/3">
          <img src={logining} alt="Login" className="rounded-lg" />
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center">Welcome Back</h2>
          <p className="text-center text-gray-600">Log in to access your account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
