import { Router } from "express";
import { stripePayment } from "./stripe.controller.js";
import { verifyToken } from "../Middleware.js/Middleware.js";
export const stripeRouter = Router()



stripeRouter.post('/checkout', verifyToken, stripePayment)
