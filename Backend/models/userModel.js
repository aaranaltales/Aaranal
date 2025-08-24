import mongoose from "mongoose"

// Create a separate schema for addresses
const addressSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    type: { type: String, required: true, default: "Home" },
    name: { type: String, required: true },
    number: {
        type: String,
        // Remove the complex validation and handle it in application logic
        required: false // Make it optional
    },
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
        password: {
            type: String,
            required: function () {
                return !this.isGoogleUser;
            }
        },
        googleId: { type: String, sparse: true, unique: true },
        avatar: { type: String },
        isGoogleUser: { type: Boolean, default: false },
        cartData: { type: Object, default: {} },
        wishListData: { type: [String], default: [] },
        addresses: { type: [addressSchema], default: [] },
        paymentMethods: { type: [paymentMethodSchema], default: [] },
        dateAdded: { type: Date, default: Date.now }
    },
    { minimize: false },
)

// Add pre-save middleware to handle address validation
userSchema.pre('save', function (next) {
    // For non-Google users, ensure addresses have a number
    if (!this.isGoogleUser && this.addresses && this.addresses.length > 0) {
        for (const address of this.addresses) {
            if (!address.number) {
                const error = new mongoose.Error.ValidationError(this);
                error.errors['addresses.number'] = new mongoose.Error.ValidatorError({
                    message: 'Phone number is required for non-Google users',
                    path: 'addresses.number',
                    value: address.number
                });
                return next(error);
            }
        }
    }

    // For Google users, set a default value if number is missing
    if (this.isGoogleUser && this.addresses && this.addresses.length > 0) {
        this.addresses.forEach(address => {
            if (!address.number) {
                address.number = "Not provided by Google";
            }
        });
    }
    next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel