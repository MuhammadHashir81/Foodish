import mongoose from 'mongoose'

const AddToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true,
        minLength: [3, 'Description must be at least 3 characters long'],
        maxLength: [200, 'Description cannot exceed 200 characters'],
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
    },
    rating: {
        type: Number,
        required: true,
        min: [0, 'Rating must be at least 0'],
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
        default: 1,
    }
}, { timestamps: true })


export const AddToCart = mongoose.model('AddToCart', AddToCartSchema)
