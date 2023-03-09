import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products`

const initialState = {
  editedProduct: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Edit product
export const doEditProduct = createAsyncThunk(
  'admin/doEditProduct',
  async (product, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(`${API_URL}/${product._id}`, product, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const editProduct = createSlice({
  name: 'editProduct',
  initialState,
  reducers: {
    editedProductReset: (state, action) => {
      state.editedProduct = {}
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(doEditProduct.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(doEditProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.editedProduct = action.payload
        state.message = `Product updated`
      })
      .addCase(doEditProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { editedProductReset } = editProduct.actions

export default editProduct.reducer