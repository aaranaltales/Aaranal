// models/customizationModel.js
import mongoose from 'mongoose';

const customizationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    type_of_bag: { type: String },
    design_description: { type: String, required: true },
    interest: { type: String, required: true, enum: ['custom', 'bulk'] },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now }
});

const customizationModel = mongoose.models.customization || mongoose.model('customization', customizationSchema);
export default customizationModel;
