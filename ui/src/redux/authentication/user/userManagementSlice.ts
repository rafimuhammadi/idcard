// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import userService from './userService'

type userSate = {
  user: any
  roles: any
  record: {}
  role: any
  userSystem: any
  userView: any
  userCheck: any
}

const initialState: userSate = {
  user: {
    data: [],
  },
  roles: [],
  record: {},
  role: [],
  userSystem: [],
  userView: {},
  userCheck: {},
}

//get user from server
export const getUser = createAsyncThunk('api/user/index', async (params: any, thunkAPI) => {
  try {
    return await userService.getUsers(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get user from server
export const getRolesBySystemId = createAsyncThunk(
  'api/role/get-roles-by-system-id',
  async (systems_id: any, thunkAPI) => {
    try {
      return await userService.getRolesBySystemId(systems_id)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// store user
export const storeUser = createAsyncThunk('api/user/store', async (formData: any, thunkAPI) => {
  try {
    return await userService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editUser = createAsyncThunk('api/user/edit', async (id: any, thunkAPI) => {
  try {
    return await userService.edit(id)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateUser = createAsyncThunk(
  'api/user/update',
  async ({id, formData}: any, thunkAPI) => {
    try {
      return await userService.update(id, formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// update user
export const viewUser = createAsyncThunk('api/user/view', async (id: any, thunkAPI) => {
  try {
    return await userService.view(id)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const check = createAsyncThunk('api/user/checkCard', async (search: any, thunkAPI) => {
  try {
    return await userService.checkCard(search)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// change user password
export const changeUserPassword = createAsyncThunk(
  'api/user/changePassword',
  async ({id, formData}: any, thunkAPI) => {
    try {
      return await userService.changePassword(id, formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// change user password
export const changeStatus = createAsyncThunk(
  'api/user/changeStatus',
  async ({id, status}: any, thunkAPI) => {
    try {
      return await userService.changeStatus(id, status)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userManagementSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction) => {
      state.user = action.payload
    })
    builder.addCase(getRolesBySystemId.fulfilled, (state, action: PayloadAction) => {
      state.roles = action.payload
    })
    builder.addCase(editUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.record = action.payload.record
      state.role = action.payload.role
      state.userSystem = action.payload.userSystem
    })
    builder.addCase(viewUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.userView = action.payload
    })
    builder.addCase(check.fulfilled, (state, action: PayloadAction<any>) => {
      state.userCheck = action.payload
    })
  },
})

export const {reset} = userManagementSlice.actions
export default userManagementSlice.reducer
