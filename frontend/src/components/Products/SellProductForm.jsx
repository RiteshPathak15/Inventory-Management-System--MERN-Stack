import React, { useState } from 'react';
import axios from 'axios';

const SellProductForm = ({ selectedProduct, setMessage }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSellProduct = async () => {
    if (quantity > selectedProduct.quantity) {
      setMessage("Insufficient stock");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/sell", {
        productId: selectedProduct._id,
        quantity,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Product sold successfully");
      console.log('Response from sell API:', response.data);
    } catch (error) {
      console.error('Error during sell product:', error);
      setMessage(error.response?.data?.message || "Failed to sell product");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <h3 className="text-2xl font-bold mb-4">Sell Product</h3>
      <p>Product: {selectedProduct.name}</p>
      <p>Price: ₹{selectedProduct.price}</p>
      <div className="flex justify-between items-center mb-3">
        <strong className="text-lg">Quantity:</strong>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded-lg w-1/2"
          min="1"
          max={selectedProduct.quantity}
        />
      </div>
      <button
        onClick={handleSellProduct}
        className="w-full p-2 bg-green-500 text-white rounded-lg mt-2"
      >
        Sell Product
      </button>
    </div>
  );
};

export default SellProductForm;
