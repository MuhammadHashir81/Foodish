import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
export const signUpUser = createAsyncThunk(
  'users/signUpUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()
    if (response.ok) {
      return data.success
    }

    if (!response.ok) {
      // return rejectWithValue(data.error);
      return rejectWithValue(data.error)
    }
  }
)



const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    success: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.success
        toast.success(state.success)
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(state.error)

      })
  },
})


export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('userJWT', data.token)
      return {
        success: data.success,
        userName: data.userName
      }

    }

    if (!response.ok) {
      // return rejectWithValue(data.error);
      return rejectWithValue(data.error)
    }
  }
)

const loginSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    userName: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.success
        state.userName = action.payload.userName
        localStorage.setItem('userName', state.userName)
        toast.success(state.success)
        setTimeout(() => {
          window.location.reload()

        }, 2000);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(state.error)

      })
  },
})


export const logout = createAsyncThunk(
  'users/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data);
      
    }



    if (!response.ok) {
      return rejectWithValue(data.error)
    }
  }
)

const logoutSlice = createSlice({
  name: 'usersLogout',
  initialState: {
    error: null,

  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {


        localStorage.removeItem('userJWT')
        localStorage.removeItem('userName')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(state.error)

      })
  },
})



export const userReducer = usersSlice.reducer
export const loginReducer = loginSlice.reducer
export const logoutReducer = logoutSlice.reducer