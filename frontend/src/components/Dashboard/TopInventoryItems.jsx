import React from "react";

const TopInventoryItems = ({ inventory }) => {
  // Get the top 5 inventory items based on quantity
  const topInventoryItems = inventory
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Top 5 Inventory Items</h2>
      <ul className="space-y-2">
        {topInventoryItems.map((item) => (
          <li key={item.productId} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-700 font-medium">{item.name}</span>
            <span className="text-gray-500">{item.quantity} units</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopInventoryItems;