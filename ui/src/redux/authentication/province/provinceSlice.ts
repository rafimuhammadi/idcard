// -- name: roleSlice.
// -- date: 01-22-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import provinceService from './provinceService'
type roleState = {
  provinces: any
}

const initialState: roleState = {
  provinces: [],
}

// Get roles
export const getProvinces = createAsyncThunk('api/user/get-provinces', async (_, thunkAPI) => {
  try {
    return await provinceService.getProvinces()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProvinces.fulfilled, (state, action: PayloadAction) => {
      state.provinces = action.payload
    })
  },
})

export const {reset} = roleSlice.actions
export default roleSlice.reducer
