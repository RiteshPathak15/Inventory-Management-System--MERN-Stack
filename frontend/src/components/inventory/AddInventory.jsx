import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSave, FaTimes } from "react-icons/fa";

const AddInventory = ({ fetchInventory }) => {
  const [inventory, setInventory] = useState({
    image: null,
    name: "",
    productId: "",
    category: "",
    buyingPrice: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    threshold: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setInventory({ ...inventory, image: files[0] });
    } else {
      setInventory({ ...inventory, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in inventory) {
      formData.append(key, inventory[key]);
    }

    try {
      await axios.post("/api/inventory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchInventory();
      setInventory({
        image: null,
        name: "",
        productId: "",
        category: "",
        buyingPrice: "",
        quantity: "",
        unit: "",
        expiryDate: "",
        threshold: "",
        price: "",
      });
      toast.success("Inventory added successfully!");
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast.error("Error adding inventory");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out transform">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={inventory.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product ID</label>
            <input
              type="text"
              name="productId"
              value={inventory.productId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={inventory.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Buying Price</label>
            <input
              type="number"
              name="buyingPrice"
              value={inventory.buyingPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={inventory.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Unit</label>
            <input
              type="text"
              name="unit"
              value={inventory.unit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={inventory.expiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Threshold</label>
            <input
              type="number"
              name="threshold"
              value={inventory.threshold}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={inventory.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setInventory({
              image: null,
              name: "",
              productId: "",
              category: "",
              buyingPrice: "",
              quantity: "",
              unit: "",
              expiryDate: "",
              threshold: "",
              price: "",
            })}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaTimes className="mr-2" />
            Discard
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaSave className="mr-2" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;