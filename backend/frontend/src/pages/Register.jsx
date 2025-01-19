import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.fullname || !formData.username || !formData.email || !formData.password) {
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
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
