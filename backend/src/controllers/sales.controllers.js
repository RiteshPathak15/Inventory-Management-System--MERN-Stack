import Sale from '../models/Sale.js';
import Supplier from '../models/Supplier.js';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

export const getDashboardData = async (req, res) => {
  try {
    const totalRevenue = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantitySold', '$salePrice'] } } } }
    ]);
    const totalOrders = await Sale.countDocuments();
    const numSuppliers = await Supplier.countDocuments();
    const lowStockData = await Inventory.find({ quantity: { $lt: 10 } });
    const recentOrders = await Order.find().sort({ deliveryDate: -1 }).limit(10);
    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: { yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } } },
          totalSales: { $sum: { $multiply: ["$quantitySold", "$salePrice"] } },
        }
      },
      { $sort: { "_id.yearMonth": 1 } }
    ]);

    const salesDataTransformed = salesData.map(data => ({
      month: new Date(data._id.yearMonth + "-01").toLocaleString('default', { month: 'short', year: 'numeric' }),
      totalSales: data.totalSales
    }));

    const inventoryLevels = await Inventory.find({}, { name: 1, quantity: 1 });
    const expiryThreshold = new Date();
    expiryThreshold.setMonth(expiryThreshold.getMonth() + 1);
    const expiryAlerts = await Inventory.find({ expiryDate: { $lte: expiryThreshold } });

    res.status(200).json({
      summaryData: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        numSuppliers,
        inventoryStatus: "Good"
      },
      lowStockData,
      recentOrders,
      salesData: salesDataTransformed,
      inventoryLevels,
      expiryAlerts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('productId');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error });
  }
};

export const addSale = async (req, res) => {
  const { productId, quantitySold, salePrice, date } = req.body;

  try {
    const newSale = new Sale({ productId, quantitySold, salePrice, date });
    await newSale.save();

    // Update inventory
    const product = await Inventory.findById(productId);
    product.quantity -= quantitySold;
    await product.save();

    res.status(201).json({ message: 'Sale added successfully', newSale });
  } catch (error) {
    res.status(400).json({ message: 'Error adding sale', error });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { quantitySold, salePrice, date } = req.body;

  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
      { quantitySold, salePrice, date },
      { new: true }
    );
    res.status(200).json({ message: 'Sale updated successfully', updatedSale });
  } catch (error) {
    res.status(400).json({ message: 'Error updating sale', error });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    await Sale.findByIdAndDelete(id);
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting sale', error });
  }
};
