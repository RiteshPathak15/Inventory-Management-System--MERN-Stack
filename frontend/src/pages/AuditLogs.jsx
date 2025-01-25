import React, { useEffect, useState } from "react";
import axios from "axios";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const response = await axios.get("/api/audit-logs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Action</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="py-2 px-4 border-b">{log.action}</td>
                <td className="py-2 px-4 border-b">{log.user}</td>
                <td className="py-2 px-4 border-b">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  <pre>{JSON.stringify(log.details, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;