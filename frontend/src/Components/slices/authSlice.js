import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const signUpUser = createAsyncThunk(
  'users/signUpUser',
  async ({ name, email, password },{ rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()
     if (!response.ok) {
        return rejectWithValue(data.error);
      }
    console.log(data)
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    data: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false
          state.error = action.payload 

      })
  },
})

export const userReducer = usersSlice.reducer
