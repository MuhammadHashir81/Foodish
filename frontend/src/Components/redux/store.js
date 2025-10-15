import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, logout, logoutReducer, userReducer } from '../slices/authSlice';
const store = configureStore({

  reducer: {
    user:userReducer,
    login:loginReducer,
    logout:logoutReducer,
    // updateCartItemsQuantity:updateCartItemsQuantityReducer
  },
});

export default store;
