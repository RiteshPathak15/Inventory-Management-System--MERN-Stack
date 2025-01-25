import React from "react";

const OrderModal = ({ order, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="space-y-4">
          <p>
            <strong>Product Name:</strong> {order.productName}
          </p>
          <p>
            <strong>Product ID:</strong> {order.productId}
          </p>
          <p>
            <strong>Category:</strong> {order.category}
          </p>
          <p>
            <strong>Order Value:</strong> ${order.orderValue}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>Unit:</strong> {order.unit}
          </p>
          <p>
            <strong>Buying Price:</strong> ${order.buyingPrice}
          </p>
          <p>
            <strong>Delivery Date:</strong>{" "}
            {new Date(order.deliveryDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Notify on Delivery:</strong> {order.notifyOnDelivery ? "Yes" : "No"}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;