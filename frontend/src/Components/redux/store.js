import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, logout, logoutReducer, userReducer } from '../slices/authSlice';
import {cartReducer} from '../slices/cartSlice'
const store = configureStore({

  reducer: {
    user:userReducer,
    login:loginReducer,
    logout:logoutReducer,
    cart:cartReducer,
    // updateCartItemsQuantity:updateCartItemsQuantityReducer
  },
});

export default store;
