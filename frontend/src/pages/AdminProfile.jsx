import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/activities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center mb-4">Admin Profile</h2>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Activity Logs</h3>
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 text-left">
              <th className="px-4 py-2 border">Timestamp</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Action</th>
              <th className="px-4 py-2 border">Target Type</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{new Date(activity.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 border">{activity.user.fullname}</td>
                <td className="px-4 py-2 border">{activity.action}</td>
                <td className="px-4 py-2 border">{activity.targetType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProfile;
