import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/users/`

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: ''
}

// Update user details
export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async (userData, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(API_URL + 'profile', userData, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })


export const userDetailsSlice = createSlice({
  name: 'userDetailsUpdate',
  initialState,
  reducers: {
    userUpdateReset: (state, action) => {
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false

      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { userUpdateReset } = userDetailsSlice.actions

export default userDetailsSlice.reducer
