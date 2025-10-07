import { Router } from "express";
import { signUp } from "../Controllers/auth.controller.js";

export const authRouter = Router();

authRouter.get('/signup',signUp )