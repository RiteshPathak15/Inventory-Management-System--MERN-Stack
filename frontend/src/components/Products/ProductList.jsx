import React from 'react';

const ProductList = ({ products, setSelectedProduct }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <h3 className="text-2xl font-bold mb-4">Available Products</h3>
      {products.length > 0 ? (
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="px-6 py-4 font-medium text-left">Product</th>
              <th className="px-6 py-4 font-medium text-left">Price</th>
              <th className="px-6 py-4 font-medium text-left">Quantity</th>
              <th className="px-6 py-4 font-medium text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No products available</p>
      )}
    </div>
  );
};

export default ProductList;
