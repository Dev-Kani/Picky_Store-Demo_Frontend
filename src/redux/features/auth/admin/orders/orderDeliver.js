import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/orders`

const initialState = {
  // ordersList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Make order delivered
export const makeOrderDelivered = createAsyncThunk(
  'admin/orderDeliver',
  async (order, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(`${API_URL}/${order._id}/deliver`, {}, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const orderDeliver = createSlice({
  name: 'orderDeliver',
  initialState,
  reducers: {
    orderDeliverReset: (state) => {
      // state.isLoading = false
      // state.isSuccess = false
      // state.isError = false
      // state.message = ''
      state = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderDelivered.pending, (state) => {
        state.isLoading = true
        // state.isSuccess = false
      })
      .addCase(makeOrderDelivered.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(makeOrderDelivered.rejected, (state, action) => {
        state.isLoading = false
        // state.isSuccess = true
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { orderDeliverReset } = orderDeliver.actions

export default orderDeliver.reducer