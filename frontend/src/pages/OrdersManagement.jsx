import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewOrder from '../components/orders/NewOrder';
import { 
  TotalRevenueCard, 
  TotalOrdersCard, 
  AverageOrderValueCard, 
  TotalQuantityCard, 
  AverageQuantityPerOrderCard, 
  MostCommonCategoryCard 
} from '../components/orders/OrderSummaryCard';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrderClick = () => {
    setShowForm(!showForm);
  };

  const handleOrderAdded = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setShowForm(false); // Hide the form after adding the order
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Orders Management</h2>
      <button
        onClick={handleAddOrderClick}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-4"
      >
        {showForm ? 'Hide Form' : 'Add Order'}
      </button>
      {showForm && <NewOrder onOrderAdded={handleOrderAdded} />}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <TotalRevenueCard orders={orders} />
          <TotalOrdersCard orders={orders} />
          <AverageOrderValueCard orders={orders} />
          <TotalQuantityCard orders={orders} />
          <AverageQuantityPerOrderCard orders={orders} />
          <MostCommonCategoryCard orders={orders} />
        </div>
        <h3 className="text-2xl font-semibold mb-4 mt-6">Orders List</h3>
        <table className="w-full bg-gray-100 rounded-lg shadow-lg mt-6">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="px-6 py-4 font-medium text-left">Product Name</th>
              <th className="px-6 py-4 font-medium text-left">Product ID</th>
              <th className="px-6 py-4 font-medium text-left">Category</th>
              <th className="px-6 py-4 font-medium text-left">Order Value</th>
              <th className="px-6 py-4 font-medium text-left">Quantity</th>
              <th className="px-6 py-4 font-medium text-left">Unit</th>
              <th className="px-6 py-4 font-medium text-left">Buying Price</th>
              <th className="px-6 py-4 font-medium text-left">Delivery Date</th>
              <th className="px-6 py-4 font-medium text-left">Notify on Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{order.productName}</td>
                <td className="px-6 py-4">{order.productId}</td>
                <td className="px-6 py-4">{order.category}</td>
                <td className="px-6 py-4">{order.orderValue}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">{order.unit}</td>
                <td className="px-6 py-4">{order.buyingPrice}</td>
                <td className="px-6 py-4">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{order.notifyOnDelivery ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;
