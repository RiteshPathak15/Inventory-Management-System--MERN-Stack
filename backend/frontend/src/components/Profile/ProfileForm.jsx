import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = ({ user, setUser, setMessage }) => {
  const [formData, setFormData] = useState({
    fullname: user.fullname,
    email: user.email,
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put("/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <form
      onSubmit={handleProfileUpdate}
      className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-4"
    >
      <div className="flex justify-between items-center mb-3">
        <strong className="text-lg">Email:</strong>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-1/2"
        />
      </div>
      <div className="flex justify-between items-center mb-3">
        <strong className="text-lg">Full Name:</strong>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-1/2"
        />
      </div>
      <div className="flex justify-between items-center mb-3">
        <strong className="text-lg">Password:</strong>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-1/2"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded-lg mt-2"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
