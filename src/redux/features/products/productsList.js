import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// const PRODUCTS_URL = `${process.env.REACT_APP_BACKEND_URL}api/products`

const PRODUCTS_URL = `http://localhost:5000/api/products`

const initialState = {
  products: [],
  pages: 0,
  page: 0,
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: ''
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (args, thunkAPI) => {
    const { keyword = '', pageNumber = '' } = args
    try {
      const response = await axios.get(`${PRODUCTS_URL}?keyword=${keyword}&pageNumber=${pageNumber}`)
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload.products
        state.pages = action.payload.pages
        state.page = action.payload.page
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

// export const { } = postsSlice.actions

export default productsSlice.reducer
