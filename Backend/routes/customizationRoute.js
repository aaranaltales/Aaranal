// routes/customizationRoute.js
import express from 'express';
import multer from 'multer';
import { submitCustomization, getAllCustomizations, updateCustomizationStatus, convertToOrder } from '../controllers/customizationController.js';
import adminAuth from '../middleware/adminAuth.js';
import { authUser } from '../middleware/auth.js';

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Customer endpoints
router.post('/submit',
  authUser,
  upload.fields([
    { name: 'referenceImage', maxCount: 1 }
  ]),
  submitCustomization
);

// Admin endpoints
router.get('/list', adminAuth, getAllCustomizations);
router.post('/status', adminAuth, updateCustomizationStatus);
router.post('/convert',
  adminAuth,
  upload.fields([
    { name: 'customImage', maxCount: 1 }
  ]),
  convertToOrder
);

export default router;
