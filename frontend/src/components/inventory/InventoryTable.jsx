import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

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
      toast.success("Inventory updated successfully!");
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Error updating inventory");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      fetchInventory();
      toast.success("Inventory deleted successfully!");
    } catch (error) {
      console.error("Error deleting inventory:", error);
      toast.error("Error deleting inventory");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Product ID</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Buying Price</th>
            <th className="py-3 px-6 text-left">Quantity</th>
            <th className="py-3 px-6 text-left">Unit</th>
            <th className="py-3 px-6 text-left">Expiry Date</th>
            <th className="py-3 px-6 text-left">Threshold</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {inventory.map((item) => (
            <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out">
              <td className="py-3 px-6 text-left">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </td>
              {editId === item._id ? (
                <>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="text"
                      name="productId"
                      value={editFormData.productId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      name="buyingPrice"
                      value={editFormData.buyingPrice}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="text"
                      name="unit"
                      value={editFormData.unit}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="date"
                      name="expiryDate"
                      value={editFormData.expiryDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      name="threshold"
                      value={editFormData.threshold}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center ml-2"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-left">{item.name}</td>
                  <td className="py-3 px-6 text-left">{item.productId}</td>
                  <td className="py-3 px-6 text-left">{item.category}</td>
                  <td className="py-3 px-6 text-left">{item.buyingPrice}</td>
                  <td className="py-3 px-6 text-left">{item.quantity}</td>
                  <td className="py-3 px-6 text-left">{item.unit}</td>
                  <td className="py-3 px-6 text-left">{item.expiryDate}</td>
                  <td className="py-3 px-6 text-left">{item.threshold}</td>
                  <td className="py-3 px-6 text-left">{item.price}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center ml-2"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;