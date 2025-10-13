import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { validationRules } from "../controllers/auth.controller.js";
export const authRouter = Router();

authRouter.post('/signup',validationRules, signup )
authRouter.post('/login', login )
authRouter.get('/logout', logout )