import Order from '../models/Order.models.js';

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching orders', error });
  }
};

const addOrder = async (req, res) => {
  const { productName, productId, category, orderValue, quantity, unit, buyingPrice, deliveryDate, notifyOnDelivery } = req.body;

  try {
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
    res.status(201).json({ message: 'Order added successfully', newOrder });
  } catch (error) {
    console.error('Error adding order:', error); // Log the error for debugging
    res.status(400).json({ message: 'Error adding order', error });
  }
};

export{getOrders,addOrder}