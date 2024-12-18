import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    };
    fetchInventory();
  }, []);

  const chartData = {
    labels: inventory.map((item) => item.name),
    datasets: [
      {
        label: "Stock",
        data: inventory.map((item) => item.stock),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#9c27b0",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Items</h2>
          <p className="text-3xl">{inventory.length}</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Stock</h2>
          <p className="text-3xl">
            {inventory.reduce((total, item) => total + item.stock, 0)}
          </p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Value</h2>
          <p className="text-3xl">
            ₹
            {inventory.reduce(
              (total, item) => total + item.stock * item.price,
              0
            )}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Stock Bar Chart</h3>
          <Bar data={chartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Stock Pie Chart</h3>
          <Pie data={chartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Stock Line Chart</h3>
          <Line data={chartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Stock Doughnut Chart</h3>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
