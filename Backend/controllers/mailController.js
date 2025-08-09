import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


// // ✅ Setup Zoho SMTP Transport
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT),
//     secure: true,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.zoho.in",
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_EMAIL_PASS,
    },
});

// ✅ Generic sendMail function
const sendMail = async ({ to, subject, html, fromAlias }) => {
    const from = `"${process.env.FROM_NAME}" <${fromAlias || process.env.FROM_EMAIL}>`;

    return transporter.sendMail({ from, to, subject, html });
};

// ✅ 1. Send OTP Email
const sendOtpEmail = async (to, otp) => {
    return sendMail({
        to,
        subject: 'Your OTP for Aaranal Tales',
        html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
        fromAlias: 'no-reply@aaranaltales.shop',
    });
};

// ✅ 2. Order Confirmation
const sendOrderConfirmation = async (to, order) => {
    const html = `
    <h3>Thank you for your order!</h3>
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Items:</strong> ${order.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</p>
    <p><strong>Total:</strong> ₹${order.total}</p>
    <p><strong>Shipping To:</strong> ${order.address}</p>
  `;
    return sendMail({
        to,
        subject: `Order Confirmation – Order #${order.id}`,
        html,
        fromAlias: 'orders@aaranaltales.shop',
    });
};

// ✅ 3. Order Status Update
const sendOrderStatus = async (to, orderId, status) => {
    return sendMail({
        to,
        subject: `Order Update – Order #${orderId}`,
        html: `<p>Your order status is now: <strong>${status}</strong>.</p>`,
        fromAlias: 'orders@aaranaltales.shop',
    });
};

// ✅ 4. Payment Confirmation
const sendPaymentConfirmation = async (to, payment) => {
    const html = `
    <h3>Payment Received</h3>
    <p><strong>Order ID:</strong> ${payment.orderId}</p>
    <p><strong>Amount:</strong> ₹${payment.amount}</p>
    <p><strong>Method:</strong> ${payment.method}</p>
  `;
    return sendMail({
        to,
        subject: `Payment Confirmation – Order #${payment.orderId}`,
        html,
        fromAlias: 'orders@aaranaltales.shop',
    });
};

// ✅ 5. Refund Email
const sendRefundStatus = async (to, refund) => {
    return sendMail({
        to,
        subject: `Refund Processed – Order #${refund.orderId}`,
        html: `<p>Refund of ₹${refund.amount} has been initiated to your ${refund.method} account. It may take up to 7 working days.</p>`,
        fromAlias: 'support@aaranaltales.shop',
    });
};

// ✅ 6. Customer Support Reply
const sendSupportReply = async (to, message) => {
    return sendMail({
        to,
        subject: `We Received Your Query`,
        html: `<p>Thank you for reaching out. Here is our response:</p><p>${message}</p>`,
        fromAlias: 'support@aaranaltales.shop',
    });
};

export default {
    sendOtpEmail,
    sendOrderConfirmation,
    sendOrderStatus,
    sendPaymentConfirmation,
    sendRefundStatus,
    sendSupportReply,
};

