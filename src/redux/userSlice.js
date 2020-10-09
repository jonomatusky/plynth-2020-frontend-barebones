import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { user } = action.payload
      state.user = user
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
