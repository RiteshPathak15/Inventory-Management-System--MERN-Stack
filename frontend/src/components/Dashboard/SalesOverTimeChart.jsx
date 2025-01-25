import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverTimeChart = ({ orders }) => {
  // Calculate sales over time
  const salesOverTime = orders.reduce((acc, order) => {
    const date = new Date(order.deliveryDate).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += order.orderValue;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(salesOverTime),
    datasets: [
      {
        label: "Sales",
        data: Object.values(salesOverTime),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default SalesOverTimeChart;