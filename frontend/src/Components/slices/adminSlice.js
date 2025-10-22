import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'



export const getAdminFoods = createAsyncThunk(
  'admin/getallfood',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/get-food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const data = await response.json()
    if (response.ok) {
        return data.foods
    }
    

    if (!response.ok) {
      // return rejectWithValue(data.error);
      return rejectWithValue(data.error)
    }
  }
)





const adminSlice = createSlice({
  name: 'cart',
  initialState: { 
    isLoading: false,
    success: null,  
    error: null,
    allfoods:[]
  },  
  extraReducers: (builder) => {
    builder
      .addCase(getAdminFoods.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdminFoods.fulfilled, (state, action) => {
        state.isLoading = false
        state.allfoods = action.payload
      }
    )
    .addCase(getAdminFoods.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload

    })
     
  },
})





export const adminRuducer = adminSlice.reducer