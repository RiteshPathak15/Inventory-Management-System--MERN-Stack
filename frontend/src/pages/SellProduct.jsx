import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/Products/ProductList";
import SellProductForm from "../components/Products/SellProductForm";

const SellProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center mb-4">Sell Product</h2>
      <ProductList products={products} setSelectedProduct={setSelectedProduct} />
      {selectedProduct && (
        <SellProductForm 
          selectedProduct={selectedProduct} 
          setMessage={setMessage} 
        />
      )}
      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default SellProduct;
