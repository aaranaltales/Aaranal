import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d", // or '1h', '30m', etc.
    })
}

// Get user details (including addresses and payment methods)
const userDetails = async (req, res) => {
    try {
        const { _id } = req.user // req.user is set by the protect middleware
        const user = await userModel.findById(_id).select("-password")
        if (!user) throw new Error("Cannot find user")
        return res.json({ success: true, message: "User details fetched successfully", user })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // checking user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.json({ success: false, message: "Email and new password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Address Management
const addAddress = async (req, res) => {
    try {
        const { _id } = req.user
        const { type, name, number, pincode, house, area, city, state, landmark, latitude, longitude } = req.body

        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        // If this is the first address, make it default
        const isDefault = user.addresses.length === 0

        user.addresses.push({ type, name, number, pincode, house, area, city, state, landmark, latitude, longitude, default: isDefault })
        await user.save()

        res.json({ success: true, message: "Address added successfully", addresses: user.addresses })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateAddress = async (req, res) => {
    try {
        const { _id } = req.user
        const { addressId, address } = req.body
        const { type, name, number, pincode, house, area, city, state, landmark, latitude, longitude } = address;
        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const addressToUpdate = user.addresses.id(addressId)
        if (!addressToUpdate) {
            return res.json({ success: false, message: "Address not found" })
        }

        addressToUpdate.set({ type, name, number, pincode, house, area, city, state, landmark, latitude, longitude })
        user = await user.save()

        res.json({ success: true, message: "Address updated successfully", addresses: user.addresses })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { _id } = req.user
        const { addressId } = req.body

        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const addressToDelete = user.addresses.id(addressId)
        if (!addressToDelete) {
            return res.json({ success: false, message: "Address not found" })
        }

        // If deleting the default address, set another one as default if available
        if (addressToDelete.default && user.addresses.length > 1) {
            const otherAddresses = user.addresses.filter((addr) => addr._id.toString() !== addressId)
            if (otherAddresses.length > 0) {
                otherAddresses[0].default = true
            }
        }

        user.addresses.pull({ _id: addressId })
        await user.save()

        res.json({ success: true, message: "Address deleted successfully", addresses: user.addresses })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const setDefaultAddress = async (req, res) => {
    try {
        const { _id } = req.user
        const { addressId } = req.body
        if (!addressId) throw Error("Invalid address");
        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        user.addresses.forEach((addr) => {
            addr.default = addr._id.toString() === addressId
        })
        await user.save()

        res.json({ success: true, message: "Default address set successfully", addresses: user.addresses })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Payment Method Management
const addPaymentMethod = async (req, res) => {
    try {
        const { _id } = req.user
        const { type, cardNumber, holderName, expiry } = req.body

        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        // If this is the first payment method, make it default
        const isDefault = user.paymentMethods.length === 0

        user.paymentMethods.push({ type, cardNumber, holderName, expiry, default: isDefault })
        await user.save()

        res.json({ success: true, message: "Payment method added successfully", paymentMethods: user.paymentMethods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updatePaymentMethod = async (req, res) => {
    try {
        const { _id } = req.user
        const { paymentMethodId, type, cardNumber, holderName, expiry } = req.body

        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const paymentToUpdate = user.paymentMethods.id(paymentMethodId)
        if (!paymentToUpdate) {
            return res.json({ success: false, message: "Payment method not found" })
        }

        paymentToUpdate.set({ type, cardNumber, holderNamecardHolder, expiry })
        await user.save()

        res.json({ success: true, message: "Payment method updated successfully", paymentMethods: user.paymentMethods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deletePaymentMethod = async (req, res) => {
    try {
        const { _id } = req.user
        const { paymentMethodId } = req.body

        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const paymentToDelete = user.paymentMethods.id(paymentMethodId)
        if (!paymentToDelete) {
            return res.json({ success: false, message: "Payment method not found" })
        }

        // If deleting the default payment method, set another one as default if available
        if (paymentToDelete.default && user.paymentMethods.length > 1) {
            const otherPayments = user.paymentMethods.filter((pm) => pm._id.toString() !== paymentMethodId)
            if (otherPayments.length > 0) {
                otherPayments[0].default = true
            }
        }

        user.paymentMethods.pull({ _id: paymentMethodId })
        await user.save()

        res.json({ success: true, message: "Payment method deleted successfully", paymentMethods: user.paymentMethods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const setDefaultPaymentMethod = async (req, res) => {
    try {
        const { _id } = req.user
        const { paymentMethodId } = req.body

        const user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        user.paymentMethods.forEach((pm) => {
            pm.default = pm._id.toString() === paymentMethodId
        })
        await user.save()

        res.json({ success: true, message: "Default payment method set successfully", paymentMethods: user.paymentMethods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
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
}
