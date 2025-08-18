// routes/customizationRoute.js
import express from 'express';
import { submitCustomization, getAllCustomizations, updateCustomizationStatus, convertToOrder } from '../controllers/customizationController.js';
import adminAuth from '../middleware/adminAuth.js';
import { authUser } from '../middleware/auth.js'
const router = express.Router();

router.post('/submit', authUser, submitCustomization);
router.get('/list', adminAuth, getAllCustomizations);
router.post('/status', adminAuth, updateCustomizationStatus);
router.post('/convert', adminAuth, convertToOrder);

export default router;
