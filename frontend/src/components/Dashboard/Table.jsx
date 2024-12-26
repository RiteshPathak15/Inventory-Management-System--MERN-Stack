import React from "react";

const Table = ({ title, data, columns }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="w-full bg-gray-100 text-left">
            {columns.map((key) => (
              <th key={key} className="px-4 py-2 border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((key, idx) => (
                <td key={idx} className="px-4 py-2 border">
                  {key === 'image' ? <img src={row[key]} alt="product" className="h-12 w-12 object-cover rounded-full"/> : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
