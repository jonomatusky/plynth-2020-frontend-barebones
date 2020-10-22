import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'

let initialState = {
  user: null,
  status: 'idle',
  error: null,
  scanRoute: '/',
  locationHistory: [],
}

// export const autoLogin = createAsyncThunk('auth/autoLogin', async () => {
//   try {
//     const token = localStorage.getItem('__USER_TOKEN')

//     if (!token) {
//       throw new Error('No token found')
//     }

//     const { exp } = jwt.decode(token) || {}
//     if (Date.now() >= exp * 1000) {
//       throw new Error('Token expired')
//     }

//     const { user } = await client.request({
//       url: '/users/me',
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     return { user, token }
//   } catch (err) {
//     localStorage.removeItem('__USER_TOKEN')
//     throw err
//   }
// })

// export const login = createAsyncThunk('auth/login', async ({ id, config }) => {
//   console.log(config)
//   const { user, token } = await client.request({
//     url: '/auth/login',
//     method: 'POST',
//     ...config,
//   })

//   localStorage.setItem('__USER_TOKEN', token)

//   return { user, token }
// })

// export const logout = createAsyncThunk('auth/logout', async () => {
//   localStorage.removeItem('__USER_TOKEN')
//   return
// })

// export const authWithToken = createAsyncThunk(
//   'auth/authWithToken',
//   async ({ id, config }) => {
//     const { user } = await client.request({ url: '/users/me', ...config })
//     return user
//   }
// )

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ headers, ...rest }) => {
    const { user } = await client.request({
      headers,
      url: '/users/me',
      ...rest,
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
    // login(state, action) {
    //   const { token, user } = action.payload

    //   try {
    //     state.token = token

    //     state.user = user
    //     state.isLoggedIn = true
    //     state.scanRoute = '/admin/pickup'
    //   } catch (err) {}
    // },
    // logout(state, action) {
    //   state.token = null
    //   state.user = null
    //   state.expiration = null
    //   state.status = 'idle'
    // },
    pushLocation(state, action) {
      state.locationHistory = state.locationHistory.concat(action.payload)
    },
    clearError(state, action) {
      state.error = null
      state.status = 'idle'
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
    // [autoLogin.pending]: (state, action) => {
    //   state.status = 'loading'
    // },
    // [autoLogin.fulfilled]: (state, action) => {
    //   const { user, token } = action.payload
    //   state.status = 'succeeded'
    //   state.user = user
    //   state.token = token
    //   state.expiration = (jwt.decode(token) || {}).exp * 1000
    //   state.scanRoute = '/admin/pickup'
    // },
    // [autoLogin.rejected]: (state, action) => {
    //   state.status = 'failed'
    //   state.error = action.error.message
    //   state.token = null
    //   state.expiration = null
    //   console.log(action.error.message)
    // },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    // [logout.fulfilled]: (state, action) => {
    //   state.token = null
    //   state.user = null
    //   state.expiration = null
    //   state.status = 'idle'
    // },
  },
})

export const { setUser, pushLocation, clearError } = userSlice.actions

export default userSlice.reducer
