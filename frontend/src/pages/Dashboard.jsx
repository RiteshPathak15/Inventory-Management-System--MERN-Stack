import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import AddInventoryForm from "../components/AddInventoryForm/AddInventoryForm.jsx";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("/api/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory items", error);
      }
    };
    fetchInventoryItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      setInventoryItems(inventoryItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Prepare data for each chart
  const barChartData = {
    labels: inventoryItems.map((item) => item.name),
    datasets: [
      {
        label: "Stock",
        data: inventoryItems.map((item) => item.stock),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: inventoryItems.map((item) => item.name),
    datasets: [
      {
        label: "Price",
        data: inventoryItems.map((item) => item.price),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: inventoryItems.map((item) => item.category),
    datasets: [
      {
        data: inventoryItems.map((item) => item.stock),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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

  const doughnutChartData = {
    labels: inventoryItems.map((item) => item.category),
    datasets: [
      {
        data: inventoryItems.map((item) => item.stock),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">
        Inventory Dashboard
      </h1>

      {/* Button to toggle form */}
      <div className="text-center mb-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add New Item"}
        </button>
      </div>

      {showForm && (
        <AddInventoryForm
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {/* Inventory Table */}
      <div className="overflow-x-auto mb-6 bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Category</th>
              <th className="px-4 py-2 border text-left">Price</th>
              <th className="px-4 py-2 border text-left">Stock</th>
              <th className="px-4 py-2 border text-left">Image</th>
              <th className="px-4 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.category}</td>
                <td className="px-4 py-2 border">${item.price}</td>
                <td className="px-4 py-2 border">{item.stock}</td>
                <td className="px-4 py-2 border">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-700 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-700 transition-all"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg font-semibold text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-700 transition-all"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Stock Chart</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Price Chart</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Category Distribution</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Stock Distribution</h2>
          <Doughnut data={doughnutChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
