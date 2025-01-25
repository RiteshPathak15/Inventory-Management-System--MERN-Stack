import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopSellingProductsChart = ({ orders }) => {
  // Calculate total quantity sold for each product
  const productSales = orders.reduce((acc, order) => {
    if (!acc[order.productName]) {
      acc[order.productName] = 0;
    }
    acc[order.productName] += order.quantity;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(productSales),
    datasets: [
      {
        label: "Quantity Sold",
        data: Object.values(productSales),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
      <Bar data={data} />
    </div>
  );
};

export default TopSellingProductsChart;