import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInventory from "../components/inventory/AddInventory";
import EditInventory from "../components/inventory/EditInventory";
import InventoryTable from "../components/inventory/InventoryTable";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

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

  const handleAddInventoryClick = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowEditForm(true);
  };

  const handleEditClose = () => {
    setShowEditForm(false);
    setEditItem(null);
    fetchInventory();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Inventory Management</h2>
      <button
        onClick={handleAddInventoryClick}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-4"
      >
        {showForm ? "Hide Form" : "Add Inventory"}
      </button>
      {showForm && <AddInventory fetchInventory={fetchInventory} />}
      {showEditForm && (
        <EditInventory item={editItem} onClose={handleEditClose} />
      )}
      <div className="mt-6">
        <InventoryTable
          inventory={inventory}
          fetchInventory={fetchInventory}
          onEditClick={handleEditClick}
        />
      </div>
    </div>
  );
};

export default InventoryManagement;
