  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import AddSupplier from "../components/Supplier/AddSupplier";
  import EditSupplier from "../components/Supplier/EditSupplier";
  import CustomModal from "../components/Supplier/CustomModal"; // Import the custom modal
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { FaPlus } from "react-icons/fa";
  import { MdEmail, MdPhone } from "react-icons/md";

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
        setLoading(true);
        const response = await axios.get("/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        toast.error("Error fetching suppliers");
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleAddSupplierClick = () => {
      setShowForm(!showForm);
    };

    const handleSupplierAdded = (newSupplier) => {
      setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
      setShowForm(false);
      toast.success("Supplier added successfully!");
    };

    const handleCardClick = (supplier) => {
      console.log("Clicked supplier:", supplier); // Log supplier data for debugging
      setEditSupplier(supplier);
      setShowEditForm(true);
    };

    const handleSupplierEdited = (updatedSupplier) => {
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier._id === updatedSupplier._id ? updatedSupplier : supplier
        )
      );
      setShowEditForm(false);
      toast.success("Supplier updated successfully!");
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const filteredSuppliers = suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <ToastContainer />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Supplier Management</h2>
          <button
            onClick={handleAddSupplierClick}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center"
          >
            <FaPlus className="mr-2" />
            {showForm ? "Hide Form" : "Add Supplier"}
          </button>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search suppliers..."
            className="w-full p-2 border rounded-lg"
          />
        </div>
        {showForm && (
          <AddSupplier
            fetchSuppliers={fetchSuppliers}
            onSupplierAdded={handleSupplierAdded}
          />
        )}
        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredSuppliers.map((supplier) => (
              <div
                key={supplier._id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={() => handleCardClick(supplier)}
              >
                <img
                  src={supplier.image}
                  alt={supplier.name}
                  className="h-24 w-24 object-cover rounded-full mb-4 shadow-md"
                />
                <h3 className="text-xl font-semibold">{supplier.name}</h3>
                <p className="text-gray-500">{supplier.product}</p>
                <div className="flex items-center text-gray-500 mt-2">
                  <MdPhone className="mr-2" /> {supplier.contactNumber}
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                  <MdEmail className="mr-2" /> {supplier.email}
                </div>
                <p
                  className={`mt-2 py-1 px-3 rounded-full text-sm font-medium ${
                    supplier.takesReturns
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {supplier.takesReturns ? "Taking Return" : "Not Taking Return"}
                </p>
              </div>
            ))
          )}
        </div>
        <CustomModal isOpen={showEditForm} onClose={() => setShowEditForm(false)}>
          <EditSupplier
            supplier={editSupplier}
            onSupplierEdited={handleSupplierEdited}
          />
        </CustomModal>
      </div>
    );
  };

  export default SupplierManagement;
