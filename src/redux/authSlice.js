import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'
import jwt from 'jsonwebtoken'

let initialState = {
  user: null,
  token: localStorage.getItem('__USER_TOKEN'),
  expiration: null,
  status: 'idle',
  error: null,
  scanRoute: '/',
  locationHistory: [],
}

export const login = createAsyncThunk('auth/login', async ({ config }) => {
  const { user, token } = await client.request({
    url: '/auth/login',
    method: 'POST',
    ...config,
  })

  return { user, token }
})

export const authWithToken = createAsyncThunk(
  'auth/authWithToken',
  async ({ config }) => {
    const { user } = await client.request({ url: '/users/me', ...config })
    return user
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ config }) => {
    const { user } = await client.request({
      url: `/users/me`,
      method: 'PATCH',
      ...config,
    })
    return user
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      const { user } = action.payload
      state.user = user
    },
    // login(state, action) {
    //   const { token, user } = action.payload

    //   try {
    //     state.token = token

    //     state.user = user
    //     state.isLoggedIn = true
    //     state.scanRoute = '/admin/pickup'
    //   } catch (err) {}
    // },
    logout(state, action) {
      state.token = null
      state.user = null
      state.status = 'idle'
    },
    pushLocation(state, action) {
      state.locationHistory = state.locationHistory.concat(action.payload)
    },
    clearError(state, action) {
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      const { user, token } = action.payload

      state.token = token
      state.expiration = jwt.decode(token) * 1000
      state.user = user
      state.scanRoute = '/admin/pickup'
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.token = null
      state.expiration = null
    },
    [authWithToken.pending]: (state, action) => {
      state.status = 'loading'
    },
    [authWithToken.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      state.user = action.payload
      state.expiration = jwt.decode(state.token) * 1000
      state.scanRoute = '/admin/pickup'
    },
    [authWithToken.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.token = null
      state.expiration = null
      console.log(action.error.message)
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser, logout, pushLocation, clearError } = authSlice.actions

export default authSlice.reducer
