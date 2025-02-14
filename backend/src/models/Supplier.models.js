import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  takesReturns: {
    type: Boolean,
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
