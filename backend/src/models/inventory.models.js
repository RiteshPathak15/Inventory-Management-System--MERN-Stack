import mongoose from 'mongoose';

// Define the Inventory schema
const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String },  // To store image URL from Cloudinary
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
