import React, { useState } from "react";
import axios from "axios";

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
      setInventory((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setInventory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(inventory).forEach((key) => {
      formData.append(key, inventory[key]);
    });

    try {
      await axios.post("/api/inventory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchInventory();
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">New Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Inventory Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Inventory Name</label>
            <input
              type="text"
              name="name"
              value={inventory.name}
              onChange={handleChange}
              placeholder="Enter inventory name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product ID</label>
            <input
              type="text"
              name="productId"
              value={inventory.productId}
              onChange={handleChange}
              placeholder="Enter product ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={inventory.category}
              onChange={handleChange}
              placeholder="Select product category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Buying Price</label>
            <input
              type="number"
              name="buyingPrice"
              value={inventory.buyingPrice}
              onChange={handleChange}
              placeholder="Enter buying price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={inventory.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Unit</label>
            <input
              type="text"
              name="unit"
              value={inventory.unit}
              onChange={handleChange}
              placeholder="Enter unit"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={inventory.expiryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Threshold</label>
            <input
              type="number"
              name="threshold"
              value={inventory.threshold}
              onChange={handleChange}
              placeholder="Enter threshold"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={inventory.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => fetchInventory()}
            className="bg-red-500 text-white rounded-lg px-4 py-2"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg px-4 py-2"
          >
            Add Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
