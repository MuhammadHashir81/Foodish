import mongoose from 'mongoose'

const AddToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    foodItemId:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'Admin'
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
    }
}, { timestamps: true })


export const AddToCart = mongoose.model('AddToCart', AddToCartSchema)
