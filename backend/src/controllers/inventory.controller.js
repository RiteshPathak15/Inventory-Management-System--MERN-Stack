import Inventory from "../models/inventory.models.js";

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInventoryItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInventory = async (req, res) => {
  const { id } = req.params; 
  const updateData = req.body; 

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update item", error: error.message });
  }
};

const deleteInventory = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedItem = await Inventory.findByIdAndDelete(id); 

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
};

export { getInventory, createInventoryItem, updateInventory ,deleteInventory};
