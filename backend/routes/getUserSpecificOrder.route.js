import { Router } from "express";
import { getUserSpecificOrders } from "../controllers/getUserSpecifcOrder.controller.js";
import { verifyToken } from "../Middleware.js/Middleware.js";
export const orderRouter = Router();

orderRouter.get('/get', verifyToken, getUserSpecificOrders )