import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Display 10 items per page

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/api/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory", error);
      }
    };

    fetchInventory();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.category}</td>
                <td className="px-4 py-2 border">${item.price}</td>
                <td className="px-4 py-2 border">{item.stock}</td>
                <td className="px-4 py-2 border">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-700 transition-all"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-700 transition-all"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Inventory;
