import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/`

const initialState = {
  orderPay: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Pay the order
export const payOrder = createAsyncThunk(
  'orders/payOrder',
  async (args, { thunkAPI, getState }) => {
    const { orderId, paymentResult } = args
    try {
      const state = getState()
      const { token } = state.auth.user
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(`${API_URL}orders/${orderId}/pay`, paymentResult, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const orderPay = createSlice({
  name: 'orderPay',
  initialState,
  reducers: {
    orderPayReset: (state, action) => {
      state.orderPay = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orderPay = action.payload
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = `Something went wrong!`
      })
  }
})

export const { orderPayReset } = orderPay.actions

export default orderPay.reducer