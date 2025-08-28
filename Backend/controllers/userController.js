import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { OAuth2Client } from 'google-auth-library'

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d", // or '1h', '30m', etc.
    })
}

// Google Sign In/Up
// Enhanced Google Sign In/Up with detailed error logging
const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        // console.log('Received Google token:', token ? 'Yes' : 'No');

        if (!token) {
            return res.json({ success: false, message: "Google token is required" });
        }

        // Verify the Google token with more lenient timing
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
            clockSkew: 300 // 5 minutes tolerance
        });

        const payload = ticket.getPayload();
        // console.log('Google payload:', {
        //     email: payload.email,
        //     name: payload.name,
        //     googleId: payload.sub
        // });

        const { sub: googleId, email, name, picture } = payload;

        if (!email) {
            return res.json({ success: false, message: "Email not provided by Google" });
        }

        // Check if user exists by email OR googleId
        let user = await userModel.findOne({
            $or: [{ email }, { googleId }]
        });

        if (user) {
            // Update existing user with Google info if not already set
            if (!user.googleId) {
                user.googleId = googleId;
                user.avatar = picture;
                user.isGoogleUser = true;
                
                try {
                    await user.save();
                } catch (saveError) {
                    // console.error('Error saving existing user:', saveError);
                    return res.json({ 
                        success: false, 
                        message: "Failed to update user: " + saveError.message 
                    });
                }
            }
        } else {
            // Create new user - explicitly define only the fields we want
            const userData = {
                name: name || email.split('@')[0],
                email,
                googleId,
                avatar: picture,
                isGoogleUser: true,
                // Explicitly set default values for arrays to avoid validation issues
                cartData: {},
                wishListData: [],
                addresses: [], // Empty array, no address validation issues
                paymentMethods: [], // Empty array
            };

            try {
                user = new userModel(userData);
                await user.save();
            } catch (createError) {
                // console.error('Validation errors:', createError.errors);
                
                // More detailed error message
                let errorMessage = "Failed to create user account";
                if (createError.errors) {
                    const errorFields = Object.keys(createError.errors);
                    errorMessage += `. Missing required fields: ${errorFields.join(', ')}`;
                }
                
                return res.json({ 
                    success: false, 
                    message: errorMessage + ": " + createError.message 
                });
            }
        }

        const jwtToken = createToken(user._id);

        res.json({ 
            success: true, 
            token: jwtToken,
            message: "Google authentication successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });

    } catch (error) {
        // console.error('Google auth error:', error);
        // console.error('Error stack:', error.stack);
        
        if (error.message && error.message.includes('Token used too early')) {
            return res.json({ 
                success: false, 
                message: "Authentication timing error. Please try again." 
            });
        }
        
        if (error.message && error.message.includes('audience')) {
            return res.json({ 
                success: false, 
                message: "Invalid Google client configuration" 
            });
        }
        
        res.json({ 
            success: false, 
            message: "Google authentication failed: " + error.message 
        });
    }
};

// Get user details (including addresses and payment methods)
const userDetails = async (req, res) => {
    try {
        const { _id } = req.user // req.user is set by the protect middleware
        const user = await userModel.findById(_id).select("-password")
        if (!user) throw new Error("Cannot find user")
        return res.json({ success: true, message: "User details fetched successfully", user })
    } catch (error) {
        // console.log(error)
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

        // Check if user is a Google user trying to login with password
        if (user.isGoogleUser && !user.password) {
            return res.json({ success: false, message: "Please use Google Sign-In for this account" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body
        
        // checking user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            isGoogleUser: false
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })
    } catch (error) {
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

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
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { _id } = req.user
        const { name, email, avatar } = req.body
        
        let user = await userModel.findById(_id)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        
        // Update user fields
        user.name = name
        if (avatar !== undefined) {
            user.avatar = avatar
        }
        
        // Note: Email update might require additional validation in production
        if (email && email !== user.email) {
            // Check if new email already exists
            const existingUser = await userModel.findOne({ email, _id: { $ne: _id } })
            if (existingUser) {
                return res.json({ success: false, message: "Email already exists" })
            }
            user.email = email
        }
        
        user = await user.save()
        res.json({ success: true, message: "User updated successfully", user })
    } catch (error) {
        // console.log(error)
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
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateAddress = async (req, res) => {
    try {
        const { _id } = req.user
        const { addressId, address } = req.body
        const { type, name, number, pincode, house, area, city, state, landmark, latitude, longitude } = address
        
        let user = await userModel.findById(_id)
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
        // console.log(error)
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
        // console.log(error)
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
        // console.log(error)
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
        // console.log(error)
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

        paymentToUpdate.set({ type, cardNumber, holderName, expiry })
        await user.save()

        res.json({ success: true, message: "Payment method updated successfully", paymentMethods: user.paymentMethods })
    } catch (error) {
        // console.log(error)
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
        // console.log(error)
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
        // console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.json({ success: false, message: "Email and new password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if it's a Google user
        if (user.isGoogleUser && !user.password) {
            return res.json({ success: false, message: "Cannot reset password for Google users. Please use Google Sign-In." });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        // console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    googleAuth,
    resetPassword,
    loginUser,
    registerUser,
    adminLogin,
    updateUser,
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