  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



  export const getUserSpecificOrders = createAsyncThunk(
    'cart/getUserSpecificOrders',
    async (_, { rejectWithValue }) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await response.json()
       console.log(data.success)

      if (response.ok) {
        return data.success
      }



      if (!response.ok) {
        // return rejectWithValue(data.error);
        return rejectWithValue(data.error)
      }
    }
  )



  
  const getUserSpecificOrdersSlice = createSlice({
    name: 'orders',
    initialState: { 
      loading: false,
      error:false,
      orders: [], 
    },  
    extraReducers: (builder) => {

      builder

        .addCase(getUserSpecificOrders.fulfilled, (state, action) => {
          state.orders = action.payload
        }
      )
    
       
    },
  })


  export const orderReducer = getUserSpecificOrdersSlice.reducer