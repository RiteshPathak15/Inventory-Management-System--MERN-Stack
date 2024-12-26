import React from 'react';

const EmployeeList = ({ employees }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <h3 className="text-2xl font-bold mb-4">All Employees</h3>
      {employees.length > 0 ? (
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="px-6 py-4 font-medium text-left">Full Name</th>
              <th className="px-6 py-4 font-medium text-left">Username</th>
              <th className="px-6 py-4 font-medium text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{employee.fullname}</td>
                <td className="px-6 py-4">{employee.username}</td>
                <td className="px-6 py-4">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No employees found</p>
      )}
    </div>
  );
};

export default EmployeeList;
