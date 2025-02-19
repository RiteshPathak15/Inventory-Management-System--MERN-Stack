import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewOrder from "../components/orders/NewOrder";
import Pagination from "../components/orders/Pagination";
import OrderModal from "../components/orders/OrderModal";
import {
  TotalRevenueCard,
  TotalOrdersCard,
  AverageOrderValueCard,
  TotalQuantityCard,
  AverageQuantityPerOrderCard,
  MostCommonCategoryCard,
} from "../components/orders/OrderSummaryCard";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrderAdded = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setShowForm(false);
    toast.success("Order added successfully!");
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {showForm ? "Hide Form" : "Add Order"}
      </button>
      {showForm && <NewOrder onOrderAdded={handleOrderAdded} />}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <TotalRevenueCard orders={orders} />
        <TotalOrdersCard orders={orders} />
        <AverageOrderValueCard orders={orders} />
        <TotalQuantityCard orders={orders} />
        <AverageQuantityPerOrderCard orders={orders} />
        <MostCommonCategoryCard orders={orders} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredOrders
          .slice(indexOfFirstOrder, indexOfLastOrder)
          .map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105"
              onClick={() => handleOrderClick(order)}
            >
              <h2 className="text-xl font-bold mb-2">{order.productName}</h2>
              <p className="text-gray-700 mb-2">
                Product ID: {order.productId}
              </p>
              <p className="text-gray-700 mb-2">Category: {order.category}</p>
              <p className="text-gray-700 mb-2">
                Order Value: ${order.orderValue}
              </p>
              <p className="text-gray-700 mb-2">Quantity: {order.quantity}</p>
              <p className="text-gray-700 mb-2">Unit: {order.unit}</p>
              <p className="text-gray-700 mb-2">
                Buying Price: ${order.buyingPrice}
              </p>
              <p className="text-gray-700 mb-2">
                Delivery Date:{" "}
                {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">
                Notify On Delivery: {order.notifyOnDelivery ? "Yes" : "No"}
              </p>
            </div>
          ))}
      </div>
      {filteredOrders.length > ordersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / ordersPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={handleCloseModal} />
      )}
      <ToastContainer />
    </div>
  );
};

export default OrdersManagement;
