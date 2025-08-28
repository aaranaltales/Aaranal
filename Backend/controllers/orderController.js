import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from '../models/productModel.js'
import Stripe from 'stripe'
import razorpay from 'razorpay'
import mailer from './mailController.js';

const { sendOrderConfirmation,sendOrderDelivered } = mailer;

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body.orderData;
        const { user } = req
        
        // ✅ Calculate shipping cost based on address shipping method
        const shippingCost = address.shippingMethod === 'express' ? 45 : 0;
        
        const orderData = {
            userId: user._id,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            shippingCost: shippingCost // ✅ Added shipping cost
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(user._id, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers;

        // ✅ Calculate shipping cost based on address shipping method
        const shippingCost = address.shippingMethod === 'express' ? 45 : 0;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
            shippingCost: shippingCost // ✅ Added shipping cost
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Use the calculated shipping cost instead of fixed delivery charge
        if (shippingCost > 0) {
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: 'Express Shipping'
                    },
                    unit_amount: shippingCost * 100
                },
                quantity: 1
            })
        }

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify Stripe 
const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }

    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body.orderData;
        const { user } = req;

        // ✅ Calculate shipping cost based on address shipping method
        const shippingCost = address.shippingMethod === 'express' ? 45 : 0;

        // 1. Fetch product details
        const products = await productModel.find({
            _id: { $in: items.map((i) => i.productId) }
        });

        // 2. Calculate total per item and track the max
        let highestItem = null;
        items.forEach((cartItem) => {
            const product = products.find(p => p._id.toString() === cartItem.productId)
            if (product) {
                const totalForThisItem = product.price * cartItem.quantity;
                if (!highestItem || totalForThisItem > highestItem.total) {
                    highestItem = {
                        image: product.image[0],
                        total: totalForThisItem
                    };
                }
            }
        });

        const orderData = {
            userId: user._id,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
            image: highestItem?.image || null,
            shippingCost: shippingCost // ✅ Added shipping cost
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                // console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        // console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body.response
        const userId = req.user._id
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            const order = await orderModel.findById(orderInfo.receipt)
            const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            const orderSummary = {
                orderId: order._id,
                itemsCount,
                totalCost: order.amount,
                address: order.address
            };
            const user = await userModel.findById(userId);

            await sendOrderConfirmation(user.email, orderSummary)
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User Order Data For Forntend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Fetch a single order by ID
const orderDetails = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        // Rename 'address' to 'shippingAddress' for clarity in the frontend
        const orderWithShippingAddress = {
            ...order._doc,
            shippingAddress: order.address
        };
        res.status(200).json({ success: true, order: orderWithShippingAddress });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body
        if (status == "Delivered") {
            const order = await orderModel.findById(orderId);
            const user = await userModel.findById(order.userId)
            await sendOrderDelivered(user.email, orderId)
        }
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, orderDetails };