import React from "react";

const OrderSummaryCard = ({ title, value, icon }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

export const TotalRevenueCard = ({ orders }) => {
  const totalRevenue = orders.reduce((acc, order) => acc + order.orderValue, 0);
  return (
    <OrderSummaryCard
      title="Total Revenue"
      value={`$${totalRevenue}`}
      icon="💰"
    />
  );
};

export const TotalOrdersCard = ({ orders }) => {
  return (
    <OrderSummaryCard title="Total Orders" value={orders.length} icon="📦" />
  );
};

export const AverageOrderValueCard = ({ orders }) => {
  const averageOrderValue = orders.length
    ? (
        orders.reduce((acc, order) => acc + order.orderValue, 0) / orders.length
      ).toFixed(2)
    : 0;
  return (
    <OrderSummaryCard
      title="Average Order Value"
      value={`$${averageOrderValue}`}
      icon="📊"
    />
  );
};

export const TotalQuantityCard = ({ orders }) => {
  const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
  return (
    <OrderSummaryCard title="Total Quantity" value={totalQuantity} icon="📈" />
  );
};

export const AverageQuantityPerOrderCard = ({ orders }) => {
  const averageQuantity = orders.length
    ? (
        orders.reduce((acc, order) => acc + order.quantity, 0) / orders.length
      ).toFixed(2)
    : 0;
  return (
    <OrderSummaryCard
      title="Average Quantity per Order"
      value={averageQuantity}
      icon="📉"
    />
  );
};

export const MostCommonCategoryCard = ({ orders }) => {
  const categoryCount = orders.reduce((acc, order) => {
    acc[order.category] = (acc[order.category] || 0) + 1;
    return acc;
  }, {});
  const mostCommonCategory = Object.keys(categoryCount).reduce(
    (a, b) => (categoryCount[a] > categoryCount[b] ? a : b),
    ""
  );
  return (
    <OrderSummaryCard
      title="Most Common Category"
      value={mostCommonCategory}
      icon="🏷️"
    />
  );
};

export default OrderSummaryCard;
