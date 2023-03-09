import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const PRODUCTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products/`

const initialState = {
  product: { reviews: [] },
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: ''
}

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}${productId}`)
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

// export const { } = postsSlice.actions

export default productDetailsSlice.reducer
