import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSupplier = () => {
  const [supplier, setSupplier] = useState({
    image: null,
    name: "",
    product: "",
    category: "",
    buyingPrice: "",
    contactNumber: "",
    takesReturns: false,
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setSupplier((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "takesReturns") {
      setSupplier((prev) => ({ ...prev, [name]: value === "yes" }));
    } else {
      setSupplier((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(supplier).forEach((key) => {
      formData.append(key, supplier[key]);
    });

    try {
      await axios.post("/api/suppliers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">New Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Supplier Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Supplier Name</label>
            <input
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleChange}
              placeholder="Enter supplier name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product</label>
            <input
              type="text"
              name="product"
              value={supplier.product}
              onChange={handleChange}
              placeholder="Enter product"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={supplier.category}
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
              value={supplier.buyingPrice}
              onChange={handleChange}
              placeholder="Enter buying price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={supplier.contactNumber}
              onChange={handleChange}
              placeholder="Enter supplier contact number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={supplier.email}
              onChange={handleChange}
              placeholder="Enter supplier email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Takes Returns</label>
            <select
              name="takesReturns"
              value={supplier.takesReturns ? "yes" : "no"}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="no">Not taking return</option>
              <option value="yes">Taking return</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-red-500 text-white rounded-lg px-4 py-2"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg px-4 py-2"
          >
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
