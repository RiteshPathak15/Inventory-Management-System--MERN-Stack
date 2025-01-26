import React, { useEffect, useState } from "react";
import axios from "axios";
import AddSupplier from "../components/Supplier/AddSupplier";
import EditSupplier from "../components/Supplier/EditSupplier";
import CustomModal from "../components/Supplier/CustomModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { ClipLoader } from "react-spinners"; // Add a loading spinner

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editSupplier, setEditSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/api/suppliers");
      setSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast.error("Error fetching suppliers");
      setLoading(false);
    }
  };

  const handleEditClick = (supplier) => {
    setEditSupplier(supplier);
    setShowEditForm(true);
  };

  const handleEditSupplier = (updatedSupplier) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier._id === updatedSupplier._id ? updatedSupplier : supplier
      )
    );
    setShowEditForm(false);
    setEditSupplier(null);
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`/api/suppliers/${id}`);
      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
      toast.success("Supplier deleted successfully!");
    } catch (error) {
      toast.error("Error deleting supplier");
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Supplier Management
      </h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Supplier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition duration-300"
        >
          <FaPlus className="mr-2" />
          {showForm ? "Hide Form" : "Add Supplier"}
        </button>
      </div>
      {showForm && <AddSupplier fetchSuppliers={fetchSuppliers} />}

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#007BFF"} loading={loading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 duration-300 relative"
            >
              <div className="relative">
                {supplier.image ? (
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              {/* Supplier Details Section */}
              <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-center items-center text-white z-10">
                <h2 className="text-xl font-semibold">{supplier.name}</h2>
                <p className="text-sm">{supplier.category}</p>
                <p className="text-sm flex items-center">
                  <MdPhone className="mr-2" /> {supplier.contactNumber}
                </p>
                <p className="text-sm flex items-center">
                  <MdEmail className="mr-2" /> {supplier.email}
                </p>
                <p className="text-sm">
                  Returns: {supplier.takesReturns ? "Yes" : "No"}
                </p>
              </div>

              {/* Buttons Section */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center space-x-4">
                <button
                  onClick={() => handleEditClick(supplier)}
                  className="text-white bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-110"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteSupplier(supplier._id)}
                  className="text-white bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-110"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CustomModal isOpen={showEditForm} onClose={() => setShowEditForm(false)}>
        <EditSupplier
          supplier={editSupplier}
          onSupplierEdited={handleEditSupplier}
          onClose={() => setShowEditForm(false)}
        />
      </CustomModal>

      <ToastContainer />
    </div>
  );
};

export default SupplierManagement;
