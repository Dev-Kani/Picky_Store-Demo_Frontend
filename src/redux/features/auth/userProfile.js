import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = `http://localhost:5000/api/users/`

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: {},
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: ''
}

// Get user details
export const getUserDetails = createAsyncThunk(
  'auth/userProfile',
  async (userId, thunkAPI) => {
    try {

      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(`${API_URL}${userId}`, config)

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
  name: 'userDetails',
  initialState,
  reducers: {
    userDetailsReset: (state, action) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        // console.log(action.payload)
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
  }
})

export const { userDetailsReset } = userDetailsSlice.actions

export default userDetailsSlice.reducer
