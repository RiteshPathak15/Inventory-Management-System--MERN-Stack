import React from "react";

const OrderSummaryCard = ({ orders }) => {
  const totalOrders = orders.length;
  const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Order Summary</h2>
      <p className="text-gray-700 mb-2">Total Orders: {totalOrders}</p>
      <p className="text-gray-700">Total Quantity: {totalQuantity}</p>
    </div>
  );
};

export default OrderSummaryCard;