import mongoose from "mongoose";

const inventoryMovementSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  salePrice: { type: Number }, // Sale price is optional
  date: { type: Date, default: Date.now },
});

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

export default InventoryMovement;
