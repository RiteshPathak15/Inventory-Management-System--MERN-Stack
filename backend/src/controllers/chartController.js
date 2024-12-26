import Order from "../models/Order.js";

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
