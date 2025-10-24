import mongoose from 'mongoose';
const { Schema } = mongoose;

const postPaymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },


    items: [
        {
            amountSubtotal: String,
            itemQuantity: String,
            itemAmount: String

        }
    ],

    customerEmail: {
        type: String
    },
    customerName: {
        type: String
    },
    totalAmount: {
        type: String
    }



});


export const PostPayment = mongoose.model('PostPayment', postPaymentSchema)