// -- name: roleSlice.
// -- date: 01-18-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import roleService from './roleService'
type roleState = {
  role: any
  systems: any
  permissions: any
  roleData: any
  selectedPermissions: any
  rolePermissions: any
}

const initialState: roleState = {
  role: {
    data: [],
  },
  systems: [],
  permissions: [],
  roleData: {},
  selectedPermissions: [],
  rolePermissions: [],
}

// Get roles
export const getRoles = createAsyncThunk('api/role/index', async (params: any, thunkAPI) => {
  try {
    return await roleService.getRoles(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getSystems = createAsyncThunk('api/system/getSystems', async (_, thunkAPI) => {
  try {
    return await roleService.getSystems()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get permissions by system id...
export const getPermissionsBySystemId = createAsyncThunk(
  'api/permission/getPermissionBySystemId',
  async (id: number, thunkAPI) => {
    try {
      return await roleService.getPermissionBySystemId(id)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create roles
export const createRole = createAsyncThunk('api/role/store', async (values: any, thunkAPI) => {
  try {
    const response = await roleService.store(values)
    return response
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//edit roles
export const editRole = createAsyncThunk('api/role/edit', async (id: any, thunkAPI) => {
  try {
    return await roleService.edit(id)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//create roles
export const updateRole = createAsyncThunk('api/role/update', async (values: any, thunkAPI) => {
  try {
    const response = await roleService.update(values)
    return response
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
    builder.addCase(getRoles.fulfilled, (state, action: PayloadAction) => {
      state.role = action.payload
    })
    builder.addCase(getSystems.fulfilled, (state, action: PayloadAction) => {
      state.systems = action.payload
    })
    builder.addCase(getPermissionsBySystemId.fulfilled, (state, action: PayloadAction) => {
      state.permissions = action.payload
    })
    builder.addCase(editRole.fulfilled, (state, action: PayloadAction<any>) => {
      state.selectedPermissions = action.payload.permissions
      state.roleData = action.payload.roles
      state.rolePermissions = action.payload.rolePermissions
    })
  },
})

export const {reset} = roleSlice.actions
export default roleSlice.reducer
