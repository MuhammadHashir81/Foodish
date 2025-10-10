import { configureStore } from '@reduxjs/toolkit';
import { cartItemsReducer, singleItemQuantityReducer,cartReducer } from '../slices/cartSlice';
import { userReducer } from '../slices/authSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItems:cartItemsReducer, // you can add more reducers later
    singleItemQuantity:singleItemQuantityReducer,
    user:userReducer

    
  },
});

export default store;
