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
const sendOtpEmail = async (to, otp, method = "signup") => {
  let titleText = "";
  let descText = "";

  if (method === "signup") {
    titleText = "Verify Your Email";
    descText = "Use the OTP below to complete your signup:";
  } else if (method === "forgot") {
    titleText = "Reset Your Password";
    descText = "Use the OTP below to reset your password:";
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Aaranal - ${titleText}</title>
    </head>
    <body style="margin:0; font-family: Arial, sans-serif; background:#fdfdfd; color:#333;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;">
        <tr>
          <td align="center" style="padding:30px;">
            <!-- Logo -->
            <h1 style="font-size:28px; color:#d6336c; margin:0;">Aaranal</h1>

            <!-- Card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:linear-gradient(to right,#fff0f6,#fff5f7); border-radius:20px; padding:40px; margin-top:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
              <tr>
                <td align="center">
                  <h2 style="color:#d6336c; font-weight:normal;">${titleText}</h2>
                  <p style="font-size:16px; color:#555;">${descText}</p>

                  <!-- OTP Code -->
                  <div style="margin:20px 0; font-size:28px; letter-spacing:6px; font-weight:bold; color:#333; background:#fff; padding:12px 24px; border-radius:12px; display:inline-block; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                    ${otp}
                  </div>

                  <p style="color:#777; font-size:14px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                </td>
              </tr>
            </table>

            <p style="margin-top:30px; color:#999; font-size:13px;">Made with ❤ by Aaranal</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

  return sendMail({
    to,
    subject: `Your OTP for Aaranal Tales - ${method === "signup" ? "Signup" : "Password Reset"}`,
    html: htmlContent,
    fromAlias: 'no-reply@aaranaltales.shop',
  });
};


// ✅ 2. Order Confirmation
const sendOrderConfirmation = async (to, orderSummary) => {
  const { orderId, itemsCount, totalCost, address } = orderSummary;

  // Build address string
  const customerAddress = `
        <div>
            <strong>${address.name}</strong> (${address.type})<br/>
            ${address.phone}<br/>
            ${address.house}, ${address.area}<br/>
            ${address.landmark ? address.landmark + '<br/>' : ''}
            ${address.city}, ${address.state} - ${address.pincode}<br/>
            <em>Shipping: ${address.shippingMethod}</em>
        </div>
    `;

  // Email HTML with placeholders replaced
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Aaranal - Order Confirmed</title>
    </head>
    <body style="margin:0; font-family:Arial, sans-serif; background:#fafafa; color:#333;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:30px;">
                    <h1 style="color:#d6336c; margin:0;">Aaranal</h1>

                    <!-- Card -->
                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="max-width:600px; background:linear-gradient(to right,#fff0f6,#fff5f7); border-radius:20px; padding:40px; margin-top:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                        <tr>
                            <td align="center">
                                <h2 style="color:#d6336c; font-weight:normal;">Your Order is Confirmed 🎉</h2>
                                <p style="font-size:16px; color:#555;">Thank you for shopping with us! Your order
                                    <strong>#${orderId}</strong> has been confirmed.
                                </p>

                                <table width="100%"
                                    style="margin-top:20px; background:#fff; border-radius:12px; padding:20px;">
                                    <tr>
                                        <td style="font-size:15px; color:#444;">Items</td>
                                        <td style="font-size:15px; color:#444;" align="right">${itemsCount}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:15px; color:#444;">Total</td>
                                        <td style="font-size:15px; color:#444;" align="right">₹${totalCost}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:15px; color:#444; vertical-align:top;">Address</td>
                                        <td style="font-size:15px; color:#444;" align="right">
                                            ${customerAddress}
                                        </td>
                                    </tr>
                                </table>

                                <a href="#"
                                    style="display:inline-block; margin-top:25px; background:linear-gradient(to right,#d6336c,#f06595); color:#fff; text-decoration:none; padding:12px 30px; border-radius:30px; font-size:15px;">Track
                                    Order</a>
                            </td>
                        </tr>
                    </table>

                    <p style="margin-top:30px; color:#999; font-size:13px;">Made with ❤ by Aaranal</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

  return sendMail({
    to,
    subject: `Order Confirmation – Order #${orderId}`,
    html,
    fromAlias: 'no-reply@aaranaltales.shop',
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

const sendOrderDelivered = async (to, orderId) => {
  // Email HTML with placeholders replaced
  const feedbackLink = `https://aaranaltales.shop/orders/${orderId}?q=true`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Aaranal - Order Delivered</title>
    </head>
    <body style="margin:0; font-family:Arial, sans-serif; background:#fafafa; color:#333;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:30px;">
            <h1 style="color:#d6336c; margin:0;">Aaranal</h1>

            <!-- Card -->
            <table width="100%" cellpadding="0" cellspacing="0" 
              style="max-width:600px; background:linear-gradient(to right,#fff0f6,#fff5f7); border-radius:20px; padding:40px; margin-top:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
              <tr>
                <td align="center">
                  <h2 style="color:#d6336c; font-weight:normal;">Your Order Has Been Delivered ✅</h2>
                  <p style="font-size:16px; color:#555;">
                    We hope you love your handcrafted piece! 
                    Your order <strong>#${orderId}</strong> has been successfully delivered.
                  </p>

                  <p style="font-size:15px; color:#444; margin-top:20px;">
                    Don’t forget to check out our 
                    <a href="https://aaranaltales.shop/careguide" style="color:#d6336c; text-decoration:none;">
                      Care Guide
                    </a> 
                    to keep your bag beautiful for years.
                  </p>
                <a href="${feedbackLink}" 
                    style="display:inline-block; margin-top:25px; background:linear-gradient(to right,#d6336c,#f06595); color:#fff; text-decoration:none; padding:12px 30px; border-radius:30px; font-size:15px;">
                    Share Feedback
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin-top:30px; color:#999; font-size:13px;">Made with ❤ by Aaranal</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

  return sendMail({
    to,
    subject: `Order Delivered – Order #${orderId}`,
    html,
    fromAlias: 'no-reply@aaranaltales.shop',
  });
};


export default {
  sendOrderDelivered,
  sendOtpEmail,
  sendOrderConfirmation,
  sendOrderStatus,
  sendPaymentConfirmation,
  sendRefundStatus,
  sendSupportReply,
};

