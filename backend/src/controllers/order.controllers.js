import Order from "../models/Order.models.js";
import Inventory from "../models/Inventory.models.js";

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Error fetching orders", error });
  }
};

const addOrder = async (req, res) => {
  const {
    productName,
    productId,
    category,
    quantity,
    unit,
    buyingPrice,
    deliveryDate,
    notifyOnDelivery,
  } = req.body;

  try {
    const inventoryItem = await Inventory.findOne({ productId });
    if (!inventoryItem || inventoryItem.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient inventory" });
    }

    const orderValue = inventoryItem.price * quantity;

    const newOrder = new Order({
      productName,
      productId,
      category,
      orderValue,
      quantity,
      unit,
      buyingPrice,
      deliveryDate,
      notifyOnDelivery,
    });

    await newOrder.save();

    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.status(201).json({ message: "Order added successfully", newOrder });
  } catch (error) {
    console.error("Error adding order:", error); // Log the error for debugging
    res.status(400).json({ message: "Error adding order", error });
  }
};

export { getOrders, addOrder };
