import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Registerimg from "../assets/warehouses.avif";

const Register = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // ensures production URL used
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    if (avatar) {
      form.append("avatar", avatar);
    }

    try {
      const response = await axios.post(`${API_BASE}/api/users/register`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log('Registration response:', response.data);

      if (response.data.mailResult?.success) {
        toast.success(response.data.message);
        setIsOtpSent(true);
      } else {
        toast.warning("Registration saved but email verification failed. Please contact support.");
        console.error('Email error:', response.data.mailResult?.error);
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/api/users/verify-otp`, {
        email: formData.email,
        otp,
      });
      toast.success("Email verified successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("OTP verification error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update button render to show loading state
  const renderButton = () => (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full p-3 ${
        isLoading
          ? "bg-gray-400"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white font-semibold rounded-lg`}
    >
      {isLoading ? "Processing..." : "Register"}
    </button>
  );

  const renderOtpButton = () => (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full p-3 ${
        isLoading
          ? "bg-gray-400"
          : "bg-green-600 hover:bg-green-700"
      } text-white font-semibold rounded-lg`}
    >
      {isLoading ? "Verifying..." : "Verify OTP"}
    </button>
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 flex space-x-10"
      >
        <div className="hidden lg:block w-1/2">
          <img src={Registerimg} alt="Register" className="rounded-lg" />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center">
            Join Us
          </h2>
          <p className="text-center text-gray-600">
            Create an account and get started!
          </p>
          {!isOtpSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {renderButton()}
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {renderOtpButton()}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
