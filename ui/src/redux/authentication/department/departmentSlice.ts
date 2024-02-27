import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import departmentService from './departmentService'

type DepartmentState = {
  departments: any
  departmentsOptions: any
}

const initialState: DepartmentState = {
  departments: [],
  departmentsOptions: [],
}

// Get departments
export const getDepartments = createAsyncThunk('api/department/index', async (_, thunkAPI) => {
  try {
    return await departmentService.getDepartments()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//create new department
export const createDepartment = createAsyncThunk(
  'api/department/store',
  async (values: any, thunkAPI) => {
    try {
      const response = await departmentService.store(values)
      return response
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const getALlDepartmentInToOption = createAsyncThunk(
  'api/department/getALlDepartmentInToOption',
  async (_, thunkAPI) => {
    try {
      const response = await departmentService.getALlDepartmentInToOption()
      return response
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action: PayloadAction) => {
      state.departments = action.payload
    })
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      const serverResponse = action.meta.requestStatus === 'fulfilled' ? action.payload : null
      state.departments.push(serverResponse)
    })
    builder.addCase(getALlDepartmentInToOption.fulfilled, (state, action: PayloadAction) => {
      state.departmentsOptions = action.payload
    })
  },
})

export const selectServerResponse = (state: any) => state.department.serverResponse

export const {reset} = departmentSlice.actions
export default departmentSlice.reducer
