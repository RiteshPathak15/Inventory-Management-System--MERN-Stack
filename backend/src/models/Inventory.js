import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  productId: { type: String, required: true },
  category: { type: String, required: true },
  buyingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  threshold: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
