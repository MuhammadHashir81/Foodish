import { Router } from "express";
import { stripePayment, stripePostPayment } from "./stripe.controller.js";
import { verifyToken } from "../Middleware.js/Middleware.js";
import express from "express";
export const stripeRouter = Router()



stripeRouter.post('/checkout', verifyToken, stripePayment)
stripeRouter.post('/webhook', express.raw({type: 'application/json'}), stripePostPayment)
