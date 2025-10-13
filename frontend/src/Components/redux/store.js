import { configureStore } from '@reduxjs/toolkit';
import { cartItemsReducer, singleItemQuantityReducer,cartReducer } from '../slices/cartSlice';
import { loginReducer, userReducer } from '../slices/authSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItems:cartItemsReducer, // you can add more reducers later
    singleItemQuantity:singleItemQuantityReducer,
    user:userReducer,
    login:loginReducer

    
  },
});

export default store;
