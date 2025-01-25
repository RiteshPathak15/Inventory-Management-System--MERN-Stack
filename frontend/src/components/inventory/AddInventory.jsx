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
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={inventory.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product ID
        </label>
        <input
          type="text"
          name="productId"
          value={inventory.productId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={inventory.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Buying Price
        </label>
        <input
          type="number"
          name="buyingPrice"
          value={inventory.buyingPrice}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={inventory.quantity}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Unit
        </label>
        <input
          type="text"
          name="unit"
          value={inventory.unit}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Expiry Date
        </label>
        <input
          type="date"
          name="expiryDate"
          value={inventory.expiryDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Threshold
        </label>
        <input
          type="number"
          name="threshold"
          value={inventory.threshold}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={inventory.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Inventory
      </button>
    </form>
  );
};

export default AddInventory;
