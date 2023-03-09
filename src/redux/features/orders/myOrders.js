import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`

const initialState = {
  myOrders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

export const getMyOrder = createAsyncThunk(
  'orders/myOrders',
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

const myOrders = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    resetMyOrders: (state) => {
      state.myOrders = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myOrders = action.payload
      })
      .addCase(getMyOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetMyOrders } = myOrders.actions

export default myOrders.reducer