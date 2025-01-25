import Inventory from "../models/Inventory.models.js";

const getProducts = async (req, res) => {
  try {
    const products = await Inventory.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error fetching products", error });
  }
};

const addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newProduct = new Inventory({ name, quantity, price });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
export{getProducts,addProduct,updateProduct,deleteProduct}
