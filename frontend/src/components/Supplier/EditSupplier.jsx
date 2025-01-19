// components/EditSupplier.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSupplier = ({ supplier, onSupplierEdited }) => {
  const [supplierData, setSupplierData] = useState(supplier);

  useEffect(() => {
    console.log("EditSupplier received supplier:", supplier);
    setSupplierData(supplier);
  }, [supplier]);

  // Rest of the component code...
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setSupplierData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "takesReturns") {
      setSupplierData((prev) => ({ ...prev, [name]: value === "yes" }));
    } else {
      setSupplierData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !supplierData.name ||
      !supplierData.product ||
      !supplierData.category ||
      !supplierData.buyingPrice ||
      !supplierData.contactNumber ||
      !supplierData.email
    ) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    Object.keys(supplierData).forEach((key) => {
      formData.append(key, supplierData[key]);
    });

    try {
      const { data } = await axios.put(
        `/api/suppliers/${supplierData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Supplier updated successfully!");
      onSupplierEdited(data.updatedSupplier);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred during supplier update"
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Edit Supplier</h2>
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
              value={supplierData.name}
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
              value={supplierData.product}
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
              value={supplierData.category}
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
              value={supplierData.buyingPrice}
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
              value={supplierData.contactNumber}
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
              value={supplierData.email}
              onChange={handleChange}
              placeholder="Enter supplier email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Takes Returns</label>
            <select
              name="takesReturns"
              value={supplierData.takesReturns ? "yes" : "no"}
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
            onClick={() => setSupplierData(supplier)}
            className="bg-red-500 text-white rounded-lg px-4 py-2"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg px-4 py-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSupplier;
