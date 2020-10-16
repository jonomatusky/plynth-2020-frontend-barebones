import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  scanRoute: '/',
  locationHistory: [],
}

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
        localStorage.setItem('userToken', token)
      } catch (err) {}
    },
    logout(state, action) {
      localStorage.removeItem('userToken')
      state.token = null
      state.user = null
      state.isLoggedIn = false
    },
    pushLocation(state, action) {
      state.locationHistory = state.locationHistory.concat(action.payload)
    },
  },
})

export const { setUser, login, logout, pushLocation } = authSlice.actions

export default authSlice.reducer
