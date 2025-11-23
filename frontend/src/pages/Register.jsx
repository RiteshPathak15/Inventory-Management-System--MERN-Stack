import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Registerimg from "../assets/warehouses.avif";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullname ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("All fields are required!");
      return;
    }

    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    if (avatar) {
      form.append("avatar", avatar);
    }

    try {
      const { data } = await axios.post("/api/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      setIsOtpSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred during registration"
      );
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/verify-otp", {
        email: formData.email,
        otp,
      });
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    }
  };

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
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Register
              </button>
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
              <button
                type="submit"
                className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
