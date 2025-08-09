import express from "express"
const otpRouter = express.Router()
import otpStore from '../store/otpStore.js';
import mailController from '../controllers/mailController.js';

otpRouter.get('/', (req, res) => {
    console.log(otpStore);
    res.json({ success: true, message: 'OTP fetched sucess' });
})

otpRouter.post('/', (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 min

    otpStore[email] = { otp, expiresAt };

    mailController.sendOtpEmail(email, otp)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

otpRouter.post('/verify', (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body)

    const record = otpStore[email];
    console.log(record)
    if (!record) return res.status(400).json({ success: false, message: 'OTP expired or not found' });

    if (record.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });

    if (Date.now() > record.expiresAt) return res.status(400).json({ success: false, message: 'OTP expired' });

    // OTP valid → delete it from store
    delete otpStore[email];

    res.json({ success: true, message: 'OTP verified' });
});

export default otpRouter