import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInventory from "../components/inventory/AddInventory";
import InventoryTable from "../components/inventory/InventoryTable";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {showForm ? "Hide Form" : "Add Inventory"}
      </button>
      {showForm && <AddInventory fetchInventory={fetchInventory} />}
      <InventoryTable inventory={inventory} fetchInventory={fetchInventory} />
    </div>
  );
};

export default InventoryManagement;