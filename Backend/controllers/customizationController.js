// controllers/customizationController.js
import customizationModel from '../models/customizationModel.js';
import orderModel from '../models/orderModel.js';

// Submit customization request
export const submitCustomization = async (req, res) => {
    const { user } = req
    try {
        const { name, email, phone, type_of_bag, design_description, interest } = req.body;
        const newCustomization = new customizationModel({
            userId: user._id, name, email, phone, type_of_bag, design_description, interest
        });
        await newCustomization.save();
        console.log("called")
        res.json({ success: true, message: "Customization request submitted!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all customizations for admin
export const getAllCustomizations = async (req, res) => {
    try {
        const customizations = await customizationModel.find({}).sort({ date: -1 });
        res.json({ success: true, customizations });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update customization status
export const updateCustomizationStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await customizationModel.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: "Status updated!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Convert customization to order
// controllers/customizationController.js
export const convertToOrder = async (req, res) => {
    try {
        const { customizationId, userId, address, amount, paymentMethod, customImage, customPrice } = req.body;
        const customization = await customizationModel.findById(customizationId);
        if (!customization) throw new Error("Customization not found");

        const orderData = {
            userId,
            items: [{ name: customization.type_of_bag || "Custom Tote Bag", price: customPrice, quantity: 1 }],
            amount: customPrice,
            address,
            status: "Order Placed",
            paymentMethod,
            payment: paymentMethod === "COD" ? false : true,
            date: Date.now(),
            isCustomized: true,
            customImage,
            customPrice,
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await customizationModel.findByIdAndUpdate(customizationId, { status: "Converted to Order" });

        res.json({ success: true, message: "Order placed!", orderId: newOrder._id });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

