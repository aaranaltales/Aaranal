// models/orderModel.js
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  house: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
  shippingMethod: { type: String, enum: ["standard", "express"], default: "standard" },
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: addressSchema, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
  isCustomized: { type: Boolean, default: false },
  customImage: { type: String },
  customPrice: { type: Number },
  image: { type: String },
  shippingCost: { type: Number, default: 0 },
});


const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;