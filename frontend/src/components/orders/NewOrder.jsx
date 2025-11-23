import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOrder = ({ onOrderAdded }) => {
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
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductChange = (e) => {
    const selectedProduct = inventory.find(
      (item) => item.productId === e.target.value
    );
    if (selectedProduct) {
      setOrder({
        ...order,
        productName: selectedProduct.name,
        productId: selectedProduct.productId,
        category: selectedProduct.category,
        unit: selectedProduct.unit,
        buyingPrice: selectedProduct.buyingPrice,
        orderValue: selectedProduct.price * order.quantity,
      });
    }
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setOrder((prev) => ({
      ...prev,
      quantity: value,
      orderValue: prev.unit * value,
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
      onOrderAdded(response.data.newOrder);
      navigate("/orders");
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product</label>
            <select
              name="productId"
              value={order.productId}
              onChange={handleProductChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Select a product</option>
              {inventory.map((item) => (
                <option key={item.productId} value={item.productId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={order.quantity}
              onChange={handleQuantityChange}
              placeholder="Enter product quantity"
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
            onClick={() => navigate("/orders")}
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
