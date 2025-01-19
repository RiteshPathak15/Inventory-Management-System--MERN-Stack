import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOrder = ({ onOrderAdded }) => {
  // Add onOrderAdded prop
  const [order, setOrder] = useState({
    productName: "",
    productId: "",
    category: "",
    orderValue: "",
    quantity: "",
    unit: "",
    buyingPrice: "",
    deliveryDate: "",
    notifyOnDelivery: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/orders", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      onOrderAdded(response.data.newOrder); // Call onOrderAdded with the new order
      navigate("/add-orders"); // Update the navigation path
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={order.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product ID</label>
            <input
              type="text"
              name="productId"
              value={order.productId}
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
              value={order.category}
              onChange={handleChange}
              placeholder="Select product category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Order Value</label>
            <input
              type="number"
              name="orderValue"
              value={order.orderValue}
              onChange={handleChange}
              placeholder="Enter order value"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={order.quantity}
              onChange={handleChange}
              placeholder="Enter product quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Unit</label>
            <input
              type="text"
              name="unit"
              value={order.unit}
              onChange={handleChange}
              placeholder="Enter product unit"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Buying Price</label>
            <input
              type="number"
              name="buyingPrice"
              value={order.buyingPrice}
              onChange={handleChange}
              placeholder="Enter buying price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date of Delivery</label>
            <input
              type="date"
              name="deliveryDate"
              value={order.deliveryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="notifyOnDelivery"
              checked={order.notifyOnDelivery}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">
              Notify on the date of delivery
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/add-orders")}
            className="bg-red-500 text-white rounded-lg px-4 py-2"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg px-4 py-2"
          >
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrder;
