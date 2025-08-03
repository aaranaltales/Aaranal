import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js"

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { _id: decoded.id }; // ✅ FIXED

        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await userModel.findById(decoded.id).select("-password")

            if (!req.user) {
                return res.status(401).json({ success: false, message: "Not authorized, user not found" })
            }

            next()
        } catch (error) {
            console.error(error)
            return res.status(401).json({ success: false, message: "Not authorized, token failed" })
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" })
    }
}

export {
    authUser,
    protect,
};
