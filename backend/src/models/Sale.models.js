import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantitySold: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;
