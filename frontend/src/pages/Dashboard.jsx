import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InventorySummaryCard from "../components/Dashboard/InventorySummaryCard.jsx";
import OrderSummaryCard from "../components/Dashboard/OrderSummaryCard.jsx";
import RevenueSummaryCard from "../components/Dashboard/RevenueSummaryCard.jsx";
import TopSellingProductsSummaryCard from "../components/Dashboard/TopSellingProductsSummaryCard.jsx";
import InventoryChart from "../components/Dashboard/InventoryChart.jsx";
import TopSellingProductsChart from "../components/Dashboard/TopSellingProductsChart.jsx";
import TopInventoryItems from "../components/Dashboard/TopInventoryItems.jsx";
import TopSuppliersSummaryCard from "../components/Dashboard/TopSuppliersSummaryCard.jsx";
import RevenueByCategoryChart from "../components/Dashboard/RevenueByCategoryChart.jsx";
import SalesOverTimeChart from "../components/Dashboard/SalesOverTimeChart.jsx";
import LowStockItems from "../components/Dashboard/LowStockItems.jsx";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    fetchInventory();
    fetchOrders();
    fetchSuppliers();
    fetchLowStockItems();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchLowStockItems = async () => {
    try {
      const response = await axios.get("/api/inventory/low-stock",{
        headers:"Authorization: Bearer "+localStorage.getItem("token")
      });
      setLowStockItems(response.data);
    } catch (error) {
      console.error("Error fetching low stock items:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <InventorySummaryCard inventory={inventory} />
        <OrderSummaryCard orders={orders} />
        <RevenueSummaryCard orders={orders} />
        <TopSellingProductsSummaryCard orders={orders} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InventoryChart inventory={inventory} />
        <TopSellingProductsChart orders={orders} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RevenueByCategoryChart orders={orders} />
        <SalesOverTimeChart orders={orders} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TopInventoryItems inventory={inventory} />
        <TopSuppliersSummaryCard suppliers={suppliers} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LowStockItems lowStockItems={lowStockItems} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
