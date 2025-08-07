import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    type: { type: String, required: true, default: "Home" },
    name: { type: String },
    number: { type: String },
    pincode: { type: String },
    house: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    landmark: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    default: { type: Boolean, default: false },
})

const paymentMethodSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    type: { type: String, required: true },
    cardNumber: { type: String, required: true },
    holderName: { type: String, required: true },
    expiry: { type: String, required: true },
    default: { type: Boolean, default: false },
})

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {} },
        wishListData: { type: [String], default: [] },
        addresses: [addressSchema],
        paymentMethods: [paymentMethodSchema],
    },
    { minimize: false },
)

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel
