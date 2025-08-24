import express from 'express';
import { submitReview, allReviews, canReview } from '../controllers/reviewController.js';
import adminAuth from '../middleware/adminAuth.js';
import { authUser } from '../middleware/auth.js';

const reviewRouter = express.Router();

// User routes
reviewRouter.post('/submit', authUser, submitReview);
reviewRouter.post('/can-review', authUser, canReview);

// Admin routes
reviewRouter.post('/list', adminAuth, allReviews);

export default reviewRouter;