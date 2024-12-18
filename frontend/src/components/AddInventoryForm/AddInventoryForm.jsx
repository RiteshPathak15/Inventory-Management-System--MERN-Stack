import React, { useState, useEffect } from "react";
import axios from "axios";

const AddInventoryForm = ({ selectedItem, setSelectedItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null, // To store the selected image file
  });
  const [imagePreview, setImagePreview] = useState(null); // To show image preview
  const [isEditing, setIsEditing] = useState(false);

  // If we are editing an existing item, pre-fill the form
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        category: selectedItem.category,
        price: selectedItem.price,
        stock: selectedItem.stock,
        image: null, // Do not include image here as it will be fetched from Cloudinary
      });
      setImagePreview(selectedItem.image); // Preview the existing image
      setIsEditing(true);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file); // Read the file as DataURL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("stock", formData.stock);
    if (formData.image) {
      formDataToSubmit.append("image", formData.image); // Append the image file
    }

    try {
      const response = isEditing
        ? await axios.put(
            `/api/inventory/${selectedItem._id}`,
            formDataToSubmit
          )
        : await axios.post("/api/inventory", formDataToSubmit);

      if (response.data) {
        alert("Inventory item saved successfully!");
        setFormData({
          name: "",
          category: "",
          price: "",
          stock: "",
          image: null,
        });
        setImagePreview(null);
      }
    } catch (error) {
      alert("Error saving item");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
      </h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Item Name"
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border p-2 w-full"
        required
      />

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block mb-2">
          Upload Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          className="mt-4 max-w-xs h-auto"
        />
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isEditing ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default AddInventoryForm;
