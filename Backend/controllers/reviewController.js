import reviewModel from "../models/reviewModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Submit a review
const submitReview = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;
        const { user } = req;

        // Check if order exists and belongs to user
        const order = await orderModel.findOne({ _id: orderId, userId: user._id });
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Check if already reviewed
        const existingReview = await reviewModel.findOne({ userId: user._id, orderId });
        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this order" });
        }

        const reviewData = {
            userId: user._id,
            orderId,
            customerName: user.name,
            rating: parseInt(rating),
            comment,
            orderDate: order.date,
            orderAmount: order.amount,
            orderStatus: order.status,
            orderItems: order.items,
            date: Date.now()
        };

        const newReview = new reviewModel(reviewData);
        await newReview.save();

        res.json({ success: true, message: "Review submitted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all reviews for admin
const allReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({})
      .sort({ date: -1 })
      .populate({
        path: "orderItems.productId", // populate productId inside orderItems
        select: "name category price image description" // pick required fields
      });

    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Check if user can review an order
const canReview = async (req, res) => {
    try {
        const { orderId } = req.body;
        const { user } = req;

        // Check if order exists and belongs to user
        const order = await orderModel.findOne({ _id: orderId, userId: user._id });
        if (!order) {
            return res.json({ success: false, canReview: false, message: "Order not found" });
        }

        // Check if order is delivered
        if (order.status.toLowerCase() !== 'delivered') {
            return res.json({ success: false, canReview: false, message: "Order must be delivered to leave a review" });
        }

        // Check if already reviewed
        const existingReview = await reviewModel.findOne({ userId: user._id, orderId });
        if (existingReview) {
            return res.json({ success: false, canReview: false, message: "You have already reviewed this order" });
        }

        res.json({ success: true, canReview: true });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { submitReview, allReviews, canReview };