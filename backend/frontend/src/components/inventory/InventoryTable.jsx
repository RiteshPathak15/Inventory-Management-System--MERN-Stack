import React from "react";
import axios from "axios";

const InventoryTable = ({ inventory, fetchInventory, onEditClick }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4">Inventory List</h3>
      <table className="w-full bg-gray-100 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr className="text-gray-700">
            <th className="px-6 py-4 font-medium text-left">Image</th>
            <th className="px-6 py-4 font-medium text-left">Name</th>
            <th className="px-6 py-4 font-medium text-left">Product ID</th>
            <th className="px-6 py-4 font-medium text-left">Category</th>
            <th className="px-6 py-4 font-medium text-left">Buying Price</th>
            <th className="px-6 py-4 font-medium text-left">Quantity</th>
            <th className="px-6 py-4 font-medium text-left">Unit</th>
            <th className="px-6 py-4 font-medium text-left">Expiry Date</th>
            <th className="px-6 py-4 font-medium text-left">Threshold</th>
            <th className="px-6 py-4 font-medium text-left">Price</th>
            <th className="px-6 py-4 font-medium text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.productId}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">{item.buyingPrice}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">{item.unit}</td>
              <td className="px-6 py-4">
                {new Date(item.expiryDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{item.threshold}</td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => onEditClick(item)}
                  className="bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white rounded-lg px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
