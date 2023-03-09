import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products`

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Delete products
export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      await axios.delete(`${API_URL}/${productId}`, config)

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const handleProducts = createSlice({
  name: 'handleProducts',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isError = false
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

// export const { reset } = handleProducts.actions

export default handleProducts.reducer