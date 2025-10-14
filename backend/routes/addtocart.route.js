import {Router} from "express";
import { addToCart, getCartItems } from "../controllers/addtocart.controller.js";
import { verifyToken } from "../Middleware.js/Middleware.js";

export const addToCartRouter = Router();

addToCartRouter.post('/add', verifyToken, addToCart);
addToCartRouter.get('/get',verifyToken, getCartItems)