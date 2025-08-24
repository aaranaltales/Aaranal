import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    type: { type: String, required: true, default: "Home" },
    name: { type: String, required: true },
    number: { type: String, required: true },
    pincode: { type: String, required: true },
    house: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
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
        // 🔥 FIXED: Make password optional for Google users
        password: { 
            type: String, 
            required: function() {
                return !this.isGoogleUser; // Only required for non-Google users
            }
        },
        googleId: { type: String, sparse: true, unique: true },
        avatar: { type: String },
        isGoogleUser: { type: Boolean, default: false },
        cartData: { type: Object, default: {} },
        wishListData: { type: [String], default: [] },
        // 🔥 FIXED: Make sure addresses array is properly defaulted
        addresses: { type: [addressSchema], default: [] },
        paymentMethods: { type: [paymentMethodSchema], default: [] },
        dateAdded: { type: Date, default: Date.now }
    },
    { minimize: false },
)

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel