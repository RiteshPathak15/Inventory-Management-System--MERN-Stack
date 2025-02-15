import React from "react";

const TopSuppliersSummaryCard = ({ suppliers }) => {
  // Get the suppliers based on some criteria (e.g., number of products supplied)
  const topSuppliers = suppliers.slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Suppliers</h2>
      <ul className="space-y-4">
        {topSuppliers.map((supplier) => (
          <li key={supplier._id} className="flex items-center space-x-4">
            <img
              src={supplier.image}
              alt={supplier.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-gray-700 font-medium">{supplier.name}</h3>
              <p className="text-gray-500">{supplier.contact}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSuppliersSummaryCard;