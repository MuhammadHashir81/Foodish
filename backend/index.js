import express from 'express'
import {authRouter} from './routes/auth.route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { addToCartRouter } from './routes/addtocart.route.js'
import { adminRouter } from './routes/admin.route.js'
import { stripeRouter } from './StripeGateway/stripe.route.js'

dotenv.config()

const app = express()


const port = 3000

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/Foodish');
} catch (error) {
  handleError(error);
}

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook') {
    next(); // skip express.json for webhook
  } else {
    express.json()(req, res, next);
  }
});

app.use('/api/auth', authRouter)
app.use('/api/cart', addToCartRouter)

// payment route
app.use('/api/payment',stripeRouter)

// admin route 
app.use('/api', adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
