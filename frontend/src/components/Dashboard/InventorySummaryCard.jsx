import React from "react";

const InventorySummaryCard = ({ inventory }) => {
  const totalItems = inventory.length;
  const totalQuantity = inventory.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Inventory Summary</h2>
      <p className="text-gray-700 mb-2">Total Items: {totalItems}</p>
      <p className="text-gray-700">Total Quantity: {totalQuantity}</p>
    </div>
  );
};

export default InventorySummaryCard;