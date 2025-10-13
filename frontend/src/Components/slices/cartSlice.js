// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// cartSlice

const cartSlice = createSlice({
  name: 'cart',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// cartItems slice 

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    addToCartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.addToCartItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.addToCartItems.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      const item = state.addToCartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity +=1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.addToCartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -=1;
      }
    },
    clearCart: () => {
      return [];
    },
  },
});





// single quantity slice 

export const { increment, decrement, reset } = cartSlice.actions;
export const { addItem, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartItemsSlice.actions;

export const cartReducer = cartSlice.reducer;
export const cartItemsReducer = cartItemsSlice.reducer;













