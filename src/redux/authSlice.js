import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  user: null,
  token: null,
  isLoggedIn: true,
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
        localStorage.setItem('userToken', token)
      } catch (err) {}
    },
    logout(state, action) {
      state.token = null
      state.user = null
      state.isLoggedIn = false
      localStorage.removeItem('userToken')
    },
  },
})

export const { setUser, login, logout } = authSlice.actions

export default authSlice.reducer
