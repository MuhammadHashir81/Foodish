import { configureStore } from '@reduxjs/toolkit';
import { loginReducer,  logoutReducer, userReducer, } from '../slices/authSlice';
import { adminRuducer } from '../slices/adminSlice';
import {cartReducer} from '../slices/cartSlice'
const store = configureStore({

  reducer: {
    user:userReducer,
    login:loginReducer,
    logout:logoutReducer,
    cart:cartReducer,
    admin:adminRuducer
  },
});

export default store;
