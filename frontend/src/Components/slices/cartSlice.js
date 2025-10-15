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


// get cart items
export const getCartItemsFunc = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, {
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    if (response.ok) {
      return data.cartItems
    }
    if (!response.ok) {
      return rejectWithValue(data.error
      )
    }
  }
)



const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    isLoading: false,
    success: null,  
    error: null,
    cartItems: [], 
    cartValue:0
  },  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartFunc.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToCartFunc.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.success
        // state.cartItems.push(action.payload.cartItem)  // add new item to cartItems array
      }
      )
      .addCase(addToCartFunc.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getCartItemsFunc.pending, (state) => {
        state.isLoading = true
        state.error = null
      }
      )
      .addCase(getCartItemsFunc.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload  // set cartItems array to fetched items
      }
      )
      .addCase(getCartItemsFunc.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      }
      ) 
  },
})

export default cartSlice.reducer;
export { addToCartFunc, getCartItemsFunc };







