import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  target: { type: mongoose.Schema.Types.ObjectId, required: true }, // Targeted document (e.g., Order, Supplier)
  targetType: { type: String, required: true }, // Type of targeted document (e.g., 'Order', 'Supplier')
  timestamp: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
