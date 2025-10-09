import { configureStore } from '@reduxjs/toolkit';
import { cartItemsReducer, singleItemQuantityReducer,cartReducer } from '../slices/cartSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItems:cartItemsReducer, // you can add more reducers later
    singleItemQuantity:singleItemQuantityReducer
    
  },
});

export default store;
