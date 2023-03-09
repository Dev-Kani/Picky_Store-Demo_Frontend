import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/orders`

const initialState = {
  ordersList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Get all orders
export const getAllOrders = createAsyncThunk(
  'admin/allOrders',
  async (thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(API_URL, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const ordersList = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true
        // state.isSuccess = false
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ordersList = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false
        // state.isSuccess = true
        state.isError = true
        state.message = action.payload
      })
  }
})

// export const { } = usersList.actions

export default ordersList.reducer