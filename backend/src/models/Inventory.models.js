import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  buyingPrice: { type: Number, required: true },
  expiryDate: { type: Date },
  threshold: { type: Number },
  price: { type: Number, required: true },
  image: { type: String },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;