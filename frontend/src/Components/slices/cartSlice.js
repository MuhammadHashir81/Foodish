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
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      state.filter((item) => item.id !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});


// single quantity slice 

const singleItemQuantitySlice = createSlice({
  name: 'quantity',
  initialState: {
    productQuantity: 0
  },
  reducers: {
    singleItemIncrement: (state, action) => {
      state.productQuantity += 1
    },

    singleItemDecrement: (state, action) => {
      state.productQuantity -= 1
    },
  }

})

export const { increment, decrement, reset } = cartSlice.actions;
export const { addItem, removeItem, clearCart } = cartItemsSlice.actions;
export const { singleItemIncrement, singleItemDecrement } = singleItemQuantitySlice.actions

export const cartReducer = cartSlice.reducer;
export const cartItemsReducer = cartItemsSlice.reducer;
export const singleItemQuantityReducer = singleItemQuantitySlice.reducer