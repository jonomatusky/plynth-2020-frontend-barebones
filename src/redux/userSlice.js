import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'
import * as client from '../shared/util/client'

let initialState = {
  user: {},
  status: 'idle',
  updateStatus: 'idle',
  error: null,
  scanRoute: '/',
  locationHistory: [],
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ headers, ...rest }) => {
    const { user } = await client.request({
      headers,
      url: '/users/me',
    })
    return user
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: `/users/me`,
      method: 'PATCH',
      data: inputs,
    })
    return user
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { user } = action.payload
      state.user = user
    },
    pushLocation(state, action) {
      state.locationHistory = state.locationHistory.concat(action.payload)
    },
    clearError(state, action) {
      state.error = null
      state.status = 'idle'
    },
    clearUser(state, action) {
      state.status = 'idle'
      state.user = {}
      state.error = null
      state.scanRoute = '/'
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload
      state.scanRoute = '/admin/pickup'
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.scanRoute = '/'
    },
    [updateUser.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      state.user = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
  },
})

export const {
  setUser,
  pushLocation,
  clearError,
  clearUser,
} = userSlice.actions

export default userSlice.reducer
