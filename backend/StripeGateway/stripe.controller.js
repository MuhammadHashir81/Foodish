import Stripe from 'stripe';
import dotenv from "dotenv"
import { User } from '../Models/Auth.Schema.js';

dotenv.config()


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



const YOUR_DOMAIN = process.env.FRONTEND_URL;

// handle stripe payment 

export const stripePayment = async (req, res) => {
    const id = req.userId

    const findUser = await User.findById(id)

    const userEmail = findUser.email
    const { items } = req.body
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
            line_items: lineItems,
            customer_email: userEmail,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment-success`,
            cancel_url: `${YOUR_DOMAIN}/payment-error`,

            metadata: {
                userId: id
            }
        });

        res.status(200).json({ url: session.url });

    } catch (error) {
        res.status(500).json({ errro: 'internal server error' })
        console.log(error.message)

    }

};

// handle stripe post payment 


const endpointSecret = process.env.STRIPE_WEBHOOK


export const stripePostPayment = async (req, res) => {



    const signature = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret
        );
    } catch (err) {
        console.log(err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        const id = session.metadata.userId

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        const items = lineItems.data.map((item) => {
            return {
                amountSubtotal: item.amount_subtotal,
                itemQuantity: item.quantity,
                itemAmount: item.price.unit_amount
            }

        });

        const customerEmail = session.customer_details.email
        const customerName = session.customer_details.name
        const totalAmount = session.amount_total

        res.status(200).json({ success: 'post payment success ' })

    }







}
