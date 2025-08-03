import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    type: { type: String, required: true, default: "Home" }, // e.g., Home, Office
    doorNo: { type: String },
    pincode: { type: String },
    addressLine1: { type: String },
    address: { type: String, required: true }, // Full address string
    latitude: { type: Number },
    longitude: { type: Number },
    default: { type: Boolean, default: false },
})

const paymentMethodSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., Visa, Mastercard
    last4: { type: String, required: true },
    expiry: { type: String, required: true }, // MM/YY format
    default: { type: Boolean, default: false },
})

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {} },
        wishListData: { type: Object, default: {} },
        addresses: [addressSchema],
        paymentMethods: [paymentMethodSchema],
    },
    { minimize: false },
)

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel
