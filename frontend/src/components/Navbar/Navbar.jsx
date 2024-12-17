import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Hardware Inventory</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="hover:text-gray-300">
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-gray-300">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
