import { configureStore } from '@reduxjs/toolkit';
import { cartItemsReducer, cartReducer } from '../slices/cartSlice';
import { loginReducer, logout, logoutReducer, userReducer } from '../slices/authSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItems:cartItemsReducer, // you can add more reducers later
    user:userReducer,
    login:loginReducer,
    logout:logoutReducer

    
  },
});

export default store;
