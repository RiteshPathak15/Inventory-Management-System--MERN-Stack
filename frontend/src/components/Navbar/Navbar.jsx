import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md w-64">
      <div className="container mx-auto flex flex-col">
        <h1 className="text-lg font-bold mb-6">Hardware Inventory</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="block hover:text-gray-300">
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/settings" className="block hover:text-gray-300">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
