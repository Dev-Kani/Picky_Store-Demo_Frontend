import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const TOP_PRODUCTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products/top`

const initialState = {
  topProducts: [],
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: ''
}

export const fetchTopProducts = createAsyncThunk(
  'products/fetchTopProducts',
  async (thunkAPI) => {
    try {
      const response = await axios.get(TOP_PRODUCTS_URL)
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const topProducts = createSlice({
  name: 'topProducts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTopProducts.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topProducts = action.payload
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // state.message = action.payload
        state.message = `An error occurred`
      })
  }
})

// export const { } = topProducts.actions

export default topProducts.reducer
