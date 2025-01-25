import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueByCategoryChart = ({ orders }) => {
  // Calculate revenue by category
  const revenueByCategory = orders.reduce((acc, order) => {
    if (!acc[order.category]) {
      acc[order.category] = 0;
    }
    acc[order.category] += order.orderValue;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(revenueByCategory),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(revenueByCategory),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Revenue by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default RevenueByCategoryChart;