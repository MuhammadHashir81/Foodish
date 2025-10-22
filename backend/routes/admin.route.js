import {Router} from 'express';
import { adminController, getAdminFoods } from '../controllers/admin.controller.js';

export const adminRouter = Router();

adminRouter.post('/admin/post-food', adminController); 
adminRouter.get('/admin/get-food', getAdminFoods); 