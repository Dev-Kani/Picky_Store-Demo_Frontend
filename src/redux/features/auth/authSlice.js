import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/users/`

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  regLoading: false,
  regSuccess: false,
  regError: false,
  regMessage: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'register', userData)

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'login', userData)

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

// Logout user
export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.removeItem('user')
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.user = null
    },
    regReset: (state) => {
      state.regLoading = false
      state.regError = false
      state.regSuccess = false
      state.regMessage = ''
      // state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.regLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.regLoading = false
        state.regSuccess = true
        // state.user = action.payload
        state.regMessage = `Registration successful. You can login now.`
      })
      .addCase(register.rejected, (state, action) => {
        state.regLoading = false
        state.regError = true
        state.regMessage = action.payload
        // state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = `Logging success, You will be redirected to Homepage`
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isLoading = false
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
  }
})

export const { reset, regReset } = authSlice.actions

export default authSlice.reducer
