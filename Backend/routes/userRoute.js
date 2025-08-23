import express from "express"
import {
    googleAuth,
    loginUser,
    registerUser,
    adminLogin,
    userDetails,
    updateUser,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    resetPassword,
} from "../controllers/userController.js"
import { protect } from "../middleware/auth.js" // Import the protect middleware

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/google", googleAuth)
router.post("/admin", adminLogin)
router.post("/resetpassword", resetPassword)

// Protected routes for user details, addresses, and payment methods
router.get("/details", protect, userDetails)
router.put('/update', protect, updateUser)

router.post("/address", protect, addAddress)
router.put("/address", protect, updateAddress)
router.delete("/address", protect, deleteAddress)
router.put("/address/set-default", protect, setDefaultAddress)

router.post("/payment", protect, addPaymentMethod)
router.put("/payment", protect, updatePaymentMethod)
router.delete("/payment", protect, deletePaymentMethod)
router.put("/payment/set-default", protect, setDefaultPaymentMethod)

export default router