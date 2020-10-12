import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  users: null,
}

const isMatch = user => {
  return item => item.id === user.id
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      const { users } = action.payload
      state.users = users
    },
    setUser(state, action) {
      const { user } = action.payload
      const matchingIndex = state.users.findIndex(isMatch(user))

      if (matchingIndex >= 0) {
        state.users = [
          ...state.users.slice(0, matchingIndex),
          ...state.users.slice(matchingIndex + 1),
        ]
      }
      state.users = [user, ...state.users]
    },
    deleteUser(state, action) {
      const { user } = action.payload
      const matchingIndex = state.users.findIndex(isMatch(user))

      if (matchingIndex >= 0) {
        state.usersSlice = [
          ...state.users.slice(0, matchingIndex),
          ...state.users.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { setUser, setUsers, deleteUser, getUser } = usersSlice.actions

export default usersSlice.reducer
