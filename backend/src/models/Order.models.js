import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  category: { type: String, required: true },
  orderValue: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  buyingPrice: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  notifyOnDelivery: { type: Boolean, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
