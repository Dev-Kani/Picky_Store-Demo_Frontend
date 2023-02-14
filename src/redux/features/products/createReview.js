import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `http://localhost:5000/api/products/`

const initialState = {
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: ''
}

// Create a review
export const doCreateReview = createAsyncThunk(
  'product/productReview',
  async (args, thunkAPI) => {
    const { productId, rating, comment } = args
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      await axios.post(`${API_URL}${productId}/reviews`, { rating, comment }, config)

    } catch (error) {
      console.log(error)
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const productReview = createSlice({
  name: 'productReview',
  initialState,
  reducers: {
    productReviewReset: (state) => {
      state = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(doCreateReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doCreateReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(doCreateReview.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { productReviewReset } = productReview.actions

export default productReview.reducer
