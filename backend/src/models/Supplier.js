import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  product: { type: String, required: true },
  category: { type: String, required: true },
  buyingPrice: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  takesReturns: { type: Boolean, required: true },
  email: { type: String, required: true }, // Add email field
});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
