import customizationModel from '../models/customizationModel.js';
import orderModel from '../models/orderModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Submit customization request (REMOVED reference image handling)
export const submitCustomization = async (req, res) => {
    try {
        const { name, email, phone, type_of_bag, design_description, interest, userId } = req.body;

        const newCustomization = new customizationModel({
            userId,
            name,
            email,
            phone,
            type_of_bag,
            design_description,
            interest,
            status: 'Pending'
            // Removed referenceImage field
        });

        await newCustomization.save();
        res.json({ success: true, message: "Customization request submitted!" });
    } catch (error) {
        console.error("Error in submitCustomization:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all customizations for admin
export const getAllCustomizations = async (req, res) => {
    try {
        const customizations = await customizationModel.find({}).sort({ date: -1 });
        res.json({ success: true, customizations });
    } catch (error) {
        console.error("Error in getAllCustomizations:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update customization status
export const updateCustomizationStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await customizationModel.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: "Status updated!" });
    } catch (error) {
        console.error("Error in updateCustomizationStatus:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Convert customization to order (Keep admin's custom image upload functionality)
export const convertToOrder = async (req, res) => {
    try {
        const { customizationId, userId, address, paymentMethod, customPrice } = req.body;

        // Parse address from JSON string
        const addressObj = typeof address === 'string' ? JSON.parse(address) : address;

        // Handle custom design image upload (admin side only)
        let customImageUrl = null;
        if (req.files && req.files.customImage) {
            const result = await cloudinary.uploader.upload(req.files.customImage[0].path, {
                folder: 'custom-tote-designs',
                resource_type: 'image'
            });
            customImageUrl = result.secure_url;
        }

        const customization = await customizationModel.findById(customizationId);
        if (!customization) {
            return res.status(404).json({ success: false, message: "Customization not found" });
        }

        const orderData = {
            userId: userId || customization.userId,
            items: [{ name: customization.type_of_bag || "Custom Tote Bag", price: customPrice, quantity: 1 }],
            amount: customPrice,
            address: addressObj,
            status: "Order Placed",
            paymentMethod,
            payment: paymentMethod === "COD" ? false : true,
            date: Date.now(),
            isCustomized: true,
            customImage: customImageUrl,
            customPrice: parseFloat(customPrice),
            designDescription: customization.design_description
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Update customization status
        await customizationModel.findByIdAndUpdate(customizationId, {
            status: "Converted to Order",
            orderId: newOrder._id
        });

        res.json({ success: true, message: "Order placed!", orderId: newOrder._id });
    } catch (error) {
        console.error("Error in convertToOrder:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};