import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true }, // assumed to be an array of URLs or filenames
    category: { type: String, required: true },
    bestseller: { type: Boolean, default: false },
    features: { type: [String], default: [] }, // NEW FIELD
    specs: {
        dimensions: { type: String },
        weight: { type: String },
        material: { type: String },
        hardware: { type: String },
        lining: { type: String },
        origin: { type: String },
    }, // NEW FIELD
    date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
