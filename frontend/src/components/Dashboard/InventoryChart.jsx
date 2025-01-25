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

const InventoryChart = ({ inventory }) => {
  const data = {
    labels: inventory.map((item) => item.name),
    datasets: [
      {
        label: "Quantity",
        data: inventory.map((item) => item.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Inventory Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default InventoryChart;
