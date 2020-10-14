import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  users: [],
}

const isMatch = username => {
  return item => item.username === username
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      const { users } = action.payload
      state.users = users
    },
    deleteUser(state, action) {
      const username = action.payload
      const matchingIndex = state.users.findIndex(isMatch(username))

      if (matchingIndex >= 0) {
        state.users = [
          ...state.users.slice(0, matchingIndex),
          ...state.users.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { setUsers, deleteUser } = usersSlice.actions

export default usersSlice.reducer
