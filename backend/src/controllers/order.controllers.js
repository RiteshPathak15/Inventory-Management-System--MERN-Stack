import Order from "../models/Order.models.js";
import Inventory from "../models/Inventory.models.js";
import { sendMail } from "../mailer/mailer.js"; // Import sendMail function

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

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const subject = "New Order Added";
    const body = `
      <h2>New Order Added</h2>
      <p>Product Name: ${productName}</p>
      <p>Product ID: ${productId}</p>
      <p>Category: ${category}</p>
      <p>Order Value: $${orderValue}</p>
      <p>Quantity: ${quantity}</p>
      <p>Unit: ${unit}</p>
      <p>Buying Price: $${buyingPrice}</p>
      <p>Delivery Date: ${new Date(deliveryDate).toLocaleDateString()}</p>
      <p>Notify on Delivery: ${notifyOnDelivery ? "Yes" : "No"}</p>
    `;
    await sendMail(adminEmail, body, subject);

    res.status(201).json({ message: "Order added successfully", newOrder });
  } catch (error) {
    console.error("Error adding order:", error); // Log the error for debugging
    res.status(400).json({ message: "Error adding order", error });
  }
};

export { getOrders, addOrder };