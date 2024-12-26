import InventoryMovement from "../models/InventoryMovement.js";
import Inventory from "../models/Inventory.js";

// Log inventory movement
export const logInventoryMovement = async (req, res) => {
  const { productId, type, quantity, salePrice } = req.body;
  try {
    const newMovement = new InventoryMovement({
      productId,
      type,
      quantity,
      salePrice,
    });
    await newMovement.save();

    // Update inventory based on movement type
    const product = await Inventory.findById(productId);
    if (type === "sale") {
      product.quantity -= quantity;
    } else if (type === "restock") {
      product.quantity += quantity;
    }
    await product.save();

    res.status(201).json({ message: "Inventory movement logged successfully", newMovement });
  } catch (error) {
    res.status(400).json({ message: "Error logging inventory movement", error });
  }
};

// Fetch inventory movements
export const getInventoryMovements = async (req, res) => {
  try {
    const movements = await InventoryMovement.find().populate("productId");
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory movements", error });
  }
};
