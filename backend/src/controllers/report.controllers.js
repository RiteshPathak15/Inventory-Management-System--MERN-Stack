import Sale from '../models/Sale.js';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

export const getSalesReport = async (req, res) => {
  try {
    const salesReport = await Sale.aggregate([
      {
        $group: {
          _id: { yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } } },
          totalSales: { $sum: { $multiply: ["$quantitySold", "$salePrice"] } },
          totalQuantity: { $sum: "$quantitySold" },
        }
      },
      { $sort: { "_id.yearMonth": 1 } }
    ]);

    res.status(200).json(salesReport);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales report', error });
  }
};

export const getOrdersReport = async (req, res) => {
  try {
    const ordersReport = await Order.aggregate([
      {
        $group: {
          _id: { yearMonth: { $dateToString: { format: "%Y-%m", date: "$deliveryDate" } } },
          totalOrders: { $sum: "$quantity" },
          deliveredOrders: { $sum: { $cond: ["$notifyOnDelivery", "$quantity", 0] } },
        }
      },
      { $sort: { "_id.yearMonth": 1 } }
    ]);

    res.status(200).json(ordersReport);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders report', error });
  }
};

export const getInventoryReport = async (req, res) => {
  try {
    const inventoryReport = await Inventory.aggregate([
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json(inventoryReport);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory report', error });
  }
};
