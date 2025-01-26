import React from "react";

const LowStockItems = ({ lowStockItems }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Low Stock Items</h2>
      <ul className="space-y-2">
        {lowStockItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-700 font-medium">{item.name}</span>
            <span className="text-gray-500">{item.quantity} units</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockItems;