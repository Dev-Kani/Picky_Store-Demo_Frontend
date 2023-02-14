import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `http://localhost:5000/api/users`

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  updateSuccess: false
}

// Edit the users
export const doEditUser = createAsyncThunk(
  'admin/editUser',
  async (user, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(`${API_URL}/${user._id}`, user, config)

      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const updateUser = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    updateUserReset: (state) => {
      state.user = {}
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doEditUser.pending, (state) => {
        state.isLoading = true
        state.updateSuccess = false
      })
      .addCase(doEditUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.updateSuccess = true
        // state.user = action.payload
        state.message = `User details updated`
      })
      .addCase(doEditUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
  }
})

export const { updateUserReset } = updateUser.actions

export default updateUser.reducer