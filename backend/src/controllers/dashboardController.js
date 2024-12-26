import Inventory from "../models/Inventory.js";
import Sale from "../models/Sale.js";
import Supplier from "../models/Supplier.js";
import Order from "../models/Order.js";
import {User} from "../models/User.js"; // Import User model

export const getDashboardData = async (req, res) => {
  try {
    // Fetch summary data
    const totalRevenue = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantitySold', '$salePrice'] } } } }
    ]);
    const totalOrders = await Order.countDocuments(); // Corrected to count orders
    const numSuppliers = await Supplier.countDocuments();
    const totalEmployees = await User.countDocuments({ role: 'employee' });

    // Fetch low stock data
    const lowStockData = await Inventory.find({ quantity: { $lt: 10 } });

    // Fetch recent orders
    const recentOrders = await Order.find().sort({ deliveryDate: -1 }).limit(10);

    // Split orders into pending and delivered
    const pendingOrders = recentOrders.filter(order => !order.notifyOnDelivery);
    const deliveredOrders = recentOrders.filter(order => order.notifyOnDelivery);

    // Fetch sales data
    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: { yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } } },
          totalSales: { $sum: { $multiply: ["$quantitySold", "$salePrice"] } },
        }
      },
      { $sort: { "_id.yearMonth": 1 } }
    ]);

    // Transform salesData to include formatted date
    const salesDataTransformed = salesData.map(data => ({
      month: new Date(data._id.yearMonth + "-01").toLocaleString('default', { month: 'short', year: 'numeric' }),
      totalSales: data.totalSales
    }));

    // Fetch inventory levels
    const inventoryLevels = await Inventory.find({}, { name: 1, quantity: 1 });

    // Fetch expiry alerts
    const expiryThreshold = new Date();
    expiryThreshold.setMonth(expiryThreshold.getMonth() + 1); // Products expiring in the next month
    const expiryAlerts = await Inventory.find({ expiryDate: { $lte: expiryThreshold } });

    res.status(200).json({
      summaryData: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        numSuppliers,
        totalEmployees,
      },
      lowStockData,
      pendingOrders,
      deliveredOrders,
      salesData: salesDataTransformed,
      inventoryLevels,
      expiryAlerts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};

export const getChartData = async (req, res) => {
  try {
    const chartData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$deliveryDate" },
          ordered: { $sum: "$quantity" },
          delivered: { $sum: { $cond: ["$notifyOnDelivery", "$quantity", 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const labels = chartData.map((item) => `Month ${item._id}`);
    const ordered = chartData.map((item) => item.ordered);
    const delivered = chartData.map((item) => item.delivered);

    res.json({ labels, ordered, delivered });
  } catch (error) {
    res.status(500).json({ error: "Error fetching chart data" });
  }
};
