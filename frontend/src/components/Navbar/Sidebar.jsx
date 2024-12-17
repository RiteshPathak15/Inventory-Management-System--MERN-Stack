import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-blue-700 p-4">
      <div className="text-lg font-semibold mb-6">Hardware Shop</div>
      <ul>
        <li>
          <Link to="/" className="block py-2 px-4 hover:bg-blue-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="block py-2 px-4  hover:bg-blue-300">
            Inventory
          </Link>
        </li>
        {/* Add other links */}
      </ul>
    </div>
  );
};

export default Sidebar;
