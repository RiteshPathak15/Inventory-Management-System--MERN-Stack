import Inventory from "../models/Inventory.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Inventory.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error fetching products", error });
  }
};

export const addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newProduct = new Inventory({ name, quantity, price });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
};
