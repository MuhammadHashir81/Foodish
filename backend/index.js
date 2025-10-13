import express from 'express'
import {authRouter} from './routes/auth.route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
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

app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
