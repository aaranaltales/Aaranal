// models/reviewModel.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  customerName: String,
  rating: Number,
  comment: String,
  orderDate: Date,
  orderAmount: Number,
  orderStatus: String,
  orderItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, // important!
      quantity: Number
    }
  ],
  date: { type: Date, default: Date.now }
});

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);
export default reviewModel;