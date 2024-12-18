// src/controllers/inventory.controller.js
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import Inventory from "../models/inventory.models.js";
import fs from "fs";

// Add new inventory item with image upload
const addInventoryItem = async (req, res) => {
  try {
    let imageUrl = "";

    // If an image is provided, upload it to Cloudinary
    if (req.file) {
      const localFilePath = req.file.path; // Temporary file path
      const cloudinaryResult = await uploadOnCloudinary(localFilePath);

      if (cloudinaryResult) {
        imageUrl = cloudinaryResult.secure_url; // Cloudinary URL
      } else {
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    // Create the new inventory item
    const newItem = new Inventory({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: imageUrl, // Store the Cloudinary image URL
    });

    // Save the item to the database
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

// Update inventory item
const updateInventoryItem = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    };

    // If a new image is uploaded, upload it to Cloudinary
    if (req.file) {
      const localFilePath = req.file.path; // Temporary file path
      const cloudinaryResult = await uploadOnCloudinary(localFilePath);

      if (cloudinaryResult) {
        updateData.image = cloudinaryResult.secure_url; // Update the image URL
      } else {
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
};

// Delete inventory item
const deleteInventoryItem = async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};

export {
  addInventoryItem,
  getAllInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
};
