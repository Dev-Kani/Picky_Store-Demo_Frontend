import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products`

const initialState = {
  createdProduct: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Create a product
export const doCreateProduct = createAsyncThunk(
  'admin/createProduct',
  async (thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(API_URL, {}, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const createProduct = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {
    createProductReset: (state, action) => {
      state.createdProduct = {}
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(doCreateProduct.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(doCreateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.createdProduct = action.payload
        state.message = `A new product created`
      })
      .addCase(doCreateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { createProductReset } = createProduct.actions

export default createProduct.reducer