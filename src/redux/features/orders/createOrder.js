import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/`

const initialState = {
  createdOrder: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// create order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(API_URL + 'orders', order, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    createdOrderReset: (state) => {
      state.createdOrder = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.createdOrder = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { createdOrderReset } = createOrderSlice.actions

export default createOrderSlice.reducer
