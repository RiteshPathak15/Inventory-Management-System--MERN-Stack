import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaTruck,
  FaBox,
  FaUsers,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaShoppingCart,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <button
        onClick={toggleSidebar}
        className="p-4 bg-blue-500 text-white md:hidden focus:outline-none"
      >
        <FaBars />
      </button>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 space-y-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:h-auto md:w-64 md:flex md:flex-col`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Shanti Hardware</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-blue-400"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/inventory"
              className="flex items-center space-x-2 hover:text-blue-400"
            >
              <FaBox />
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link
              to="/suppliers"
              className="flex items-center space-x-2 hover:text-blue-400"
            >
              <FaTruck />
              <span>Supplier</span>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex items-center space-x-2 hover:text-blue-400"
            >
              <FaClipboardList />
              <span>Order</span>
            </Link>
          </li>
        
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:text-blue-400"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-blue-400"
            > 
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center space-x-2 hover:text-blue-400"
            >
              <FaUserPlus />
              <span>Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
