import Stripe from 'stripe';
import dotenv from "dotenv"
import { User } from '../Models/Auth.Schema.js';

dotenv.config()


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



const YOUR_DOMAIN = process.env.FRONTEND_URL;

export const stripePayment = async (req, res) => {
      const id = req.userId
      console.log(id)

      const findUser = await User.findById(id)

      const userEmail = findUser.email
    const {items} = req.body
    try {
         const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.description,   // name of item
        },
        unit_amount: item.price * 100, // Stripe accepts cents
    },
    quantity: item.quantity, // quantity of item
}));

const session = await stripe.checkout.sessions.create({
        line_items:lineItems,
        customer_email:userEmail,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/payment-success`,
        cancel_url: `${YOUR_DOMAIN}/payment-error`,
    });

    res.status(200).json({ url: session.url });
        
    } catch (error) {
        res.status(500).json({errro:'internal server error'})
        console.log(error.message)
        
    }
  
};
