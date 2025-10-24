// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// cartSlice

export const addToCartFunc = createAsyncThunk(
  'cart/addtocart',
  async ({ description, image, price, rating, quantity,foodItemId }, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, image, price, rating, quantity,foodItemId }),
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
      console.log(data)
      return data.cartItems
    }
    if (!response.ok) {
      return rejectWithValue(data.error)
    }
  }
)

// quantity update 


export const quantityUpdate = createAsyncThunk(
  'cart/quantityUpdate',
  async ({cartItemId,quantity}, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/quantity-update`, {
      method: 'PUT',  
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({cartItemId,quantity})
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      return data.itemQuantity
    }
    if (!response.ok) {
      return rejectWithValue(data.error)
    }
  }
)


// deleting item from cart 


export const deleteCartItem = createAsyncThunk(
  'cart/delte-cart-item',
  async ({id}, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/delete-item`, {
      method: 'DELETE',  
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({id})
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      return data.id
    }
    if (!response.ok) {
      return rejectWithValue(data.error)
    }
  }
)



// clear cart all the cart items

// Clear all cart items
export const clearCartFunc = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/clear-cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    if (response.ok) {
      return data
    }
    if (!response.ok) {
      return rejectWithValue(data.error)
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
  },  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartFunc.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToCartFunc.fulfilled, (state, action) => {
        state.isLoading = false
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
    state.cartItems = action.payload
      }
    )
      .addCase(getCartItemsFunc.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      }
      ) 
        .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
      }
      ) 
      .addCase(clearCartFunc.fulfilled, (state, action) => {
        state.cartItems = []
      }
      )
     
  },
})



export const cartReducer =  cartSlice.reducer;







