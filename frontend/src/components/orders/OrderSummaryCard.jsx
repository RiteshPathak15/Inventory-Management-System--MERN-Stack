import React from "react";
import {
  FaDollarSign,
  FaClipboardList,
  FaShoppingCart,
  FaBoxes,
  FaChartLine,
  FaTag,
} from "react-icons/fa";

const OrderSummaryCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md rounded-lg p-4 mb-4">
      <div className="mr-4">{icon}</div>
      <div>
        <h4 className="text-xl font-bold mb-1">{title}</h4>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export const TotalRevenueCard = ({ orders }) => {
  const totalRevenue = orders.reduce((acc, order) => acc + order.orderValue, 0);
  return (
    <OrderSummaryCard
      title="Total Revenue"
      value={`₹${totalRevenue.toFixed(2)}`}
      icon={<FaDollarSign size={32} />}
    />
  );
};

export const TotalOrdersCard = ({ orders }) => {
  const totalOrders = orders.length;
  return (
    <OrderSummaryCard
      title="Total Orders"
      value={totalOrders}
      icon={<FaClipboardList size={32} />}
    />
  );
};

export const AverageOrderValueCard = ({ orders }) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.orderValue, 0);
  const averageOrderValue =
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
  return (
    <OrderSummaryCard
      title="Average Order Value"
      value={`₹${averageOrderValue}`}
      icon={<FaShoppingCart size={32} />}
    />
  );
};

export const TotalQuantityCard = ({ orders }) => {
  const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
  return (
    <OrderSummaryCard
      title="Total Quantity"
      value={totalQuantity}
      icon={<FaBoxes size={32} />}
    />
  );
};

export const AverageQuantityPerOrderCard = ({ orders }) => {
  const totalOrders = orders.length;
  const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
  const averageQuantityPerOrder =
    totalOrders > 0 ? (totalQuantity / totalOrders).toFixed(2) : 0;
  return (
    <OrderSummaryCard
      title="Average Quantity per Order"
      value={averageQuantityPerOrder}
      icon={<FaChartLine size={32} />}
    />
  );
};

export const MostCommonCategoryCard = ({ orders }) => {
  const categoryCounts = orders.reduce((acc, order) => {
    acc[order.category] = (acc[order.category] || 0) + 1;
    return acc;
  }, {});
  const mostCommonCategory = Object.keys(categoryCounts).reduce(
    (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b),
    ""
  );
  return (
    <OrderSummaryCard
      title="Most Common Category"
      value={mostCommonCategory}
      icon={<FaTag size={32} />}
    />
  );
};

export default OrderSummaryCard;
