import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: null,
    },
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: { type: Number, default: 1 },
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
