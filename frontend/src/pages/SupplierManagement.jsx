import React, { useEffect, useState } from "react";
import axios from "axios";
import AddSupplier from "./AddSupplier";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleAddSupplierClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Supplier Management</h2>
      <button
        onClick={handleAddSupplierClick}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-4"
      >
        {showForm ? "Hide Form" : "Add Supplier"}
      </button>
      {showForm && <AddSupplier />}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Supplier List</h3>
        <table className="w-full bg-gray-100 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="px-6 py-4 font-medium text-left">Image</th>
              <th className="px-6 py-4 font-medium text-left">Supplier Name</th>
              <th className="px-6 py-4 font-medium text-left">Product</th>
              <th className="px-6 py-4 font-medium text-left">
                Contact Number
              </th>
              <th className="px-6 py-4 font-medium text-left">Email</th>
              <th className="px-6 py-4 font-medium text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{supplier.name}</td>
                <td className="px-6 py-4">{supplier.product}</td>
                <td className="px-6 py-4">{supplier.contactNumber}</td>
                <td className="px-6 py-4">{supplier.email}</td>
                <td className="px-6 py-4">
                  {supplier.takesReturns
                    ? "Taking Return"
                    : "Not Taking Return"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierManagement;
