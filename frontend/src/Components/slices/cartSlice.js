// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// cartSlice

export const addToCartFunc = createAsyncThunk(
  'cart/addtocart',
  async ({ description, image, price, rating, quantity }, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, image, price, rating, quantity }),
      credentials: 'include'
    })

    const data = await response.json()
    console.log(data)
    
    
    
    if (!response.ok) {
      // return rejectWithValue(data.error);
      return rejectWithValue(data.error)
    }
  }
)


// gett cart items from backend

export const getCartItemsFunc = createAsyncThunk(
  'cart/getcartitems',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data.cartItems)
      return data.cartItems;

    }

    if (!response.ok) {
      // return rejectWithValue(data.error);
      return rejectWithValue(data.error)
    }
  }
)


const getCartItemsSlice = createSlice({
  name: 'getCartItemsForUser',
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
    cartValue: 0
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsFunc.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }
      )
      .addCase(getCartItemsFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload
        state.cartValue = action.payload.length
      })
      .addCase(getCartItemsFunc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});




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






// single quantity slice 

export const { increment, decrement, reset } = cartSlice.actions;
export const { setCartValue } = getCartItemsSlice.actions;

export const cartReducer = cartSlice.reducer;
export const getCartItemsReducer = getCartItemsSlice.reducer;
