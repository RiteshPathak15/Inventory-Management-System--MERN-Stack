import React from "react";

const RevenueSummaryCard = ({ orders }) => {
  const totalRevenue = orders.reduce((acc, order) => acc + order.orderValue, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Revenue Summary</h2>
      <p className="text-gray-700">Total Revenue: ${totalRevenue.toFixed(2)}</p>
    </div>
  );
};

export default RevenueSummaryCard;