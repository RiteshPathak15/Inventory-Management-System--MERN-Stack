import React, { useState } from "react";
import axios from "axios";

const InventoryTable = ({ inventory, fetchInventory }) => {
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditFormData(item);
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`/api/inventory/${editId}`, editFormData);
      fetchInventory();
      setEditId(null);
      setEditFormData({});
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Image</th>
          <th className="py-2">Name</th>
          <th className="py-2">Product ID</th>
          <th className="py-2">Category</th>
          <th className="py-2">Buying Price</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Unit</th>
          <th className="py-2">Expiry Date</th>
          <th className="py-2">Threshold</th>
          <th className="py-2">Price</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item._id}>
            <td className="border px-4 py-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
            </td>
            {editId === item._id ? (
              <>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="productId"
                    value={editFormData.productId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="buyingPrice"
                    value={editFormData.buyingPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="quantity"
                    value={editFormData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="unit"
                    value={editFormData.unit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    name="expiryDate"
                    value={editFormData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="threshold"
                    value={editFormData.threshold}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 ml-2"
                  >
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.productId}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.buyingPrice}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">{item.expiryDate}</td>
                <td className="border px-4 py-2">{item.threshold}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
