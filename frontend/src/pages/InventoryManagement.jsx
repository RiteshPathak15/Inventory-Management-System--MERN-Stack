import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInventory from "../components/inventory/AddInventory";
import InventoryTable from "../components/inventory/InventoryTable";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      toast.error("Error fetching inventory");
    }
  };

  const handleToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const totalItems = inventory.length;
  const totalQuantity = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = inventory.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
        >
          <FaPlus className="mr-2" />
          {showForm ? "Hide Form" : "Add Inventory"}
        </button>
      </div>
      {showForm && (
        <div className="mb-6">
          <AddInventory
            fetchInventory={fetchInventory}
            handleToast={handleToast}
          />
        </div>
      )}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Total Items</h2>
          <p className="text-4xl font-bold text-blue-500">{totalItems}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Total Quantity</h2>
          <p className="text-4xl font-bold text-green-500">{totalQuantity}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Total Value</h2>
          <p className="text-4xl font-bold text-red-500">
            ${totalValue.toFixed(2)}
          </p>
        </div>
      </div>
      <InventoryTable inventory={filteredInventory} fetchInventory={fetchInventory} />
    </div>
  );
};

export default InventoryManagement;