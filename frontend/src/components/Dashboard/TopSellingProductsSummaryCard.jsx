import React from "react";

const TopSellingProductsSummaryCard = ({ orders }) => {
  // Calculate total quantity sold for each product
  const productSales = orders.reduce((acc, order) => {
    if (!acc[order.productName]) {
      acc[order.productName] = 0;
    }
    acc[order.productName] += order.quantity;
    return acc;
  }, {});

  // Get the top 5 selling products
  const topSellingProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Top Selling Products</h2>
      <ul className="list-disc list-inside">
        {topSellingProducts.map(([productName, quantity]) => (
          <li key={productName} className="text-gray-700">
            {productName}: {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProductsSummaryCard;