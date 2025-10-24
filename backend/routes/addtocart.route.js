import { Router } from "express";
import { addToCart, clearCart, deleteCartItems, getCartItems, updateCartItemQuantity } from "../controllers/addtocart.controller.js";
import { verifyToken } from "../Middleware.js/Middleware.js";

export const addToCartRouter = Router();

addToCartRouter.post('/add', verifyToken, addToCart);
addToCartRouter.get('/get', verifyToken, getCartItems)
addToCartRouter.put('/quantity-update', verifyToken, updateCartItemQuantity)
addToCartRouter.delete('/delete-item',verifyToken, deleteCartItems)
addToCartRouter.delete('/clear-cart',verifyToken,clearCart)