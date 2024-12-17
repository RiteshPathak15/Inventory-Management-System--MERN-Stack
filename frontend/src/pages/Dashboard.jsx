import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalStock: 0,
    highestPriceItem: "",
    totalCategories: 0,
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/api/inventory");
        const data = response.data;
        setInventory(data);
        calculateStats(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    const calculateStats = (data) => {
      const totalStock = data.reduce((sum, item) => sum + item.stock, 0);
      const highestPriceItem = data.reduce((max, item) =>
        item.price > max.price ? item : max
      );
      const totalCategories = new Set(data.map((item) => item.category)).size;

      setStats({
        totalItems: data.length,
        totalStock,
        highestPriceItem: highestPriceItem.name,
        totalCategories,
      });
    };

    fetchInventory();
  }, []);

  const chartData = {
    labels: inventory.map((item) => item.name),
    datasets: [
      {
        label: "Stock",
        data: inventory.map((item) => item.stock),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const priceData = {
    labels: inventory.map((item) => item.name),
    datasets: [
      {
        label: "Price",
        data: inventory.map((item) => item.price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Pie Chart Data: Distribution of Stock by Categories
  const categoryStock = inventory.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += item.stock;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryStock),
    datasets: [
      {
        label: "Stock Distribution by Category",
        data: Object.values(categoryStock),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-gray-600 font-medium">Total Items</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.totalItems}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-gray-600 font-medium">Total Stock</h2>
          <p className="text-2xl font-bold text-green-600">{stats.totalStock}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-gray-600 font-medium">Highest Price Item</h2>
          <p className="text-lg font-semibold text-yellow-600">
            {stats.highestPriceItem}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-gray-600 font-medium">Total Categories</h2>
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalCategories}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Inventory Stock Levels (Bar Chart)
          </h2>
          <Bar data={chartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Price Trends (Line Chart)
          </h2>
          <Line data={priceData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Stock Distribution by Category (Pie Chart)
          </h2>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Stock Distribution (Doughnut Chart)
          </h2>
          <Doughnut data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
