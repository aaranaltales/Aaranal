import express from "express"
import {
    loginUser,
    registerUser,
    adminLogin,
    userDetails,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
} from "../controllers/userController.js"
import { protect } from "../middleware/auth.js" // Import the protect middleware

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/admin", adminLogin)

// Protected routes for user details, addresses, and payment methods
router.get("/details", protect, userDetails)

router.post("/address", protect, addAddress)
router.put("/address", protect, updateAddress) // Changed to PUT for update, expects addressId in body
router.delete("/address", protect, deleteAddress) // Changed to DELETE for delete, expects addressId in body
router.put("/address/set-default", protect, setDefaultAddress) // Changed to PUT for set default, expects addressId in body

router.post("/payment", protect, addPaymentMethod)
router.put("/payment", protect, updatePaymentMethod) // Changed to PUT for update, expects paymentMethodId in body
router.delete("/payment", protect, deletePaymentMethod) // Changed to DELETE for delete, expects paymentMethodId in body
router.put("/payment/set-default", protect, setDefaultPaymentMethod) // Changed to PUT for set default, expects paymentMethodId in body

export default router
