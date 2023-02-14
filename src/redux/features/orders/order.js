import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `http://localhost:5000/api/`

const initialState = {
  orderItemDetails: {},
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: ''
}

// Get order details
export const getOrderDetails = createAsyncThunk(
  'orders/orderDetails',
  async (orderId, { thunkAPI, getState }) => {
    const state = getState()
    try {
      if (state.auth.user !== null) {
        var { token } = state.auth.user
      }

      console.log(token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(`${API_URL}orders/${orderId}`, config)

      return response.data
    } catch (error) {
      console.log(error);
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    orderDetailsReset: (state) => {
      state.orderItemDetails = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orderItemDetails = action.payload
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { orderDetailsReset } = orderDetailsSlice.actions

export default orderDetailsSlice.reducer