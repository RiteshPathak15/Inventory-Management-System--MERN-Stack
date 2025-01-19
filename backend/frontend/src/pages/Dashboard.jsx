import React, { useEffect, useState } from "react";
import axios from "axios";
import InventoryChart from "../components/Dashboard/InventoryChart";
import ExpiryAlertsTable from "../components/Dashboard/ExpiryAlertsTable";
import OrderChart from "../components/Dashboard/OrderChart";
import Table from "../components/Dashboard/Table";

const Dashboard = () => {
  const [lowStockData, setLowStockData] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [inventoryLevels, setInventoryLevels] = useState([]);
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [orderChartData, setOrderChartData] = useState({ labels: [], ordered: [], delivered: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");

  useEffect(() => {
    fetchDashboardData();
    fetchOrderChartData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      const {
        lowStockData,
        pendingOrders,
        deliveredOrders,
        inventoryLevels,
        expiryAlerts
      } = response.data;

      setLowStockData(lowStockData || []);
      setPendingOrders(pendingOrders || []);
      setDeliveredOrders(deliveredOrders || []);
      setInventoryLevels(inventoryLevels || []);
      setExpiryAlerts(expiryAlerts || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchOrderChartData = async () => {
    try {
      const response = await axios.get("/api/dashboard/chart-data");
      const { labels, ordered, delivered } = response.data;
      setOrderChartData({ labels, ordered, delivered });
    } catch (error) {
      console.error("Error fetching order chart data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const filterData = (data) => {
    return data.filter(item =>
      Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredLowStockData = filterData(lowStockData);
  const filteredPendingOrders = filterData(pendingOrders);
  const filteredDeliveredOrders = filterData(deliveredOrders);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-lg w-full md:w-1/2"
        />
        <select
          value={filterCriteria}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg ml-4"
        >
          <option value="all">All</option>
          <option value="lowStock">Low Stock</option>
          <option value="pendingOrders">Pending Orders</option>
          <option value="deliveredOrders">Delivered Orders</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <OrderChart chartData={orderChartData} />
        <InventoryChart inventoryLevels={inventoryLevels} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ExpiryAlertsTable alerts={expiryAlerts} />
        <Table title="Low Quantity Stock" data={filteredLowStockData} columns={['image', 'name', 'productId', 'category', 'quantity', 'price']} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Table title="Pending Orders" data={filteredPendingOrders} columns={['deliveryDate', 'quantity']} />
        <Table title="Delivered Orders" data={filteredDeliveredOrders} columns={['deliveryDate', 'quantity']} />
      </div>
    </div>
  );
};

export default Dashboard;
