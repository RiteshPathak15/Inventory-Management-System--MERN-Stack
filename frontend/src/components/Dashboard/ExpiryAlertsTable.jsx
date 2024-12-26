import React from "react";

const ExpiryAlertsTable = ({ alerts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-4">Product Expiry Alerts</h3>
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="w-full bg-gray-100 text-left">
            <th className="px-4 py-2 border">Product</th>
            <th className="px-4 py-2 border">Expiry Date</th>
            <th className="px-4 py-2 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{alert.name}</td>
              <td className="px-4 py-2 border">{new Date(alert.expiryDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{alert.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiryAlertsTable;
