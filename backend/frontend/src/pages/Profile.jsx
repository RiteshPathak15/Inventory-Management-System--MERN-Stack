import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get("/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user);

          // Set initial form data
          setFormData({
            fullname: data.user.fullname,
            email: data.user.email,
            password: "",
          });

          // If the user is an admin, fetch employee details
          if (data.user.role === "admin") {
            const employeesData = await axios.get("/api/employees", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(employeesData.data);
          }
        } catch (error) {
          setMessage(error.response?.data?.message || "Failed to fetch user");
        }
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarUpdate = async () => {
    if (!avatar) {
      setMessage("Please select an avatar to upload");
      return;
    }
    const form = new FormData();
    form.append("avatar", avatar);
    try {
      const { data } = await axios.put("/api/avatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setUser(data.user);
      setMessage("Avatar updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update avatar");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      setMessage("Logged out successfully");
      setUser(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Logout failed");
    }
  };

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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center mb-4">Profile</h2>
      {user ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={user.avatar || "https://via.placeholder.com/150"} // Placeholder URL for a default avatar
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-2xl font-bold">{user.fullname}</p>
            <p className="text-xl text-gray-500">@{user.username}</p>
          </div>
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
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={handleAvatarUpdate}
              className="w-full p-2 bg-blue-500 text-white rounded-lg mt-2"
            >
              Update Avatar
            </button>
          </div>
          {user.role === "admin" && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="text-2xl font-bold mb-4">All Employees</h3>
              {employees.length > 0 ? (
                <table className="w-full bg-white rounded-lg shadow-lg">
                  <thead className="bg-gray-200">
                    <tr className="text-gray-700">
                      <th className="px-6 py-4 font-medium text-left">
                        Full Name
                      </th>
                      <th className="px-6 py-4 font-medium text-left">
                        Username
                      </th>
                      <th className="px-6 py-4 font-medium text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr
                        key={employee._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">{employee.fullname}</td>
                        <td className="px-6 py-4">{employee.username}</td>
                        <td className="px-6 py-4">{employee.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No employees found</p>
              )}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full p-2 bg-red-500 text-white rounded-lg mt-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center">No user logged in</p>
      )}
      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default Profile;
