import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'



export const handleStripePayment = createAsyncThunk(
  'admin/getallfood',
  async ({items}, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({items}),
      credentials:'include'
      
    })

    const data = await response.json()
    if (response.ok) {
      
        window.location.href = data.url
        return data.url
    }
    

    if (!response.ok) {
      // return rejectWithValue(data.error);
      return rejectWithValue(data.error)
    }
  }
)








