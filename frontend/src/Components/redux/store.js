import { configureStore } from '@reduxjs/toolkit';
import {  cartReducer, getCartItemsReducer } from '../slices/cartSlice';
import { loginReducer, logout, logoutReducer, userReducer } from '../slices/authSlice';
const store = configureStore({

  reducer: {
    cart: cartReducer,
    user:userReducer,
    login:loginReducer,
    logout:logoutReducer,
    getCartItems:getCartItemsReducer,
    // updateCartItemsQuantity:updateCartItemsQuantityReducer
  },
});

export default store;
