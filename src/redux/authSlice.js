import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'

let initialState = {
  user: null,
  token: localStorage.getItem('__USER_TOKEN'),
  status: 'idle',
  error: null,
  scanRoute: '/',
  locationHistory: [],
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const { user, token } = await client.request({
      url: '/auth/login',
      method: 'POST',
      data: {
        user: { email, password },
      },
    })

    return { user, token }
  }
)

export const loginFromToken = createAsyncThunk(
  'auth/loginFromToken',
  async ({ token }) => {
    if (!!token) {
      const { user } = await client.request({ url: '/users/me', token })
      return { user, token }
    }
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
    login(state, action) {
      const { token, user } = action.payload

      try {
        state.token = token
        state.user = user
        state.isLoggedIn = true
        state.scanRoute = '/admin/pickup'
      } catch (err) {}
    },
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
      state.user = user
      state.scanRoute = '/admin/pickup'
      localStorage.setItem('__USER_TOKEN', token)
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      console.log(action.error.message)
    },
    [loginFromToken.pending]: (state, action) => {
      state.status = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      const { user, token } = action.payload

      state.token = token
      state.user = user
      state.scanRoute = '/admin/pickup'
      localStorage.setItem('__USER_TOKEN', token)
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      console.log(action.error.message)
    },
  },
})

export const { setUser, logout, pushLocation, clearError } = authSlice.actions

export default authSlice.reducer
