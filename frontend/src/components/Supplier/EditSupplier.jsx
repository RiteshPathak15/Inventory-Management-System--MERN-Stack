import React, { useState, useEffect } from "react";
import axios from "axios";

const EditSupplier = ({ supplier, onSupplierEdited, onClose }) => {
  const [supplierData, setSupplierData] = useState({
    _id: "",
    image: null,
    name: "",
    category: "",
    contactNumber: "",
    email: "",
    takesReturns: false,
  });

  useEffect(() => {
    if (supplier) {
      setSupplierData(supplier);
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setSupplierData({ ...supplierData, image: files[0] });
    } else {
      setSupplierData({ ...supplierData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in supplierData) {
      formData.append(key, supplierData[key]);
    }

    try {
      const response = await axios.put(
        `/api/suppliers/${supplierData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSupplierEdited(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating supplier:", error);
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
          value={supplierData.name}
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
          value={supplierData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contact Number
        </label>
        <input
          type="text"
          name="contactNumber"
          value={supplierData.contactNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={supplierData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Takes Returns
        </label>
        <input
          type="checkbox"
          name="takesReturns"
          checked={supplierData.takesReturns}
          onChange={(e) =>
            setSupplierData({ ...supplierData, takesReturns: e.target.checked })
          }
          className="mr-2 leading-tight"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditSupplier;
