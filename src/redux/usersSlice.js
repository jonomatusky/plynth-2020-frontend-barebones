import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  users: [],
  filter: 'ACTIVE',
}

const isMatch = username => {
  return user => user.username === username
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
      const matchingIndex = state.users.findIndex(isMatch(user.username))

      if (matchingIndex >= 0) {
        state.users = [
          ...state.users.slice(0, matchingIndex),
          ...state.users.slice(matchingIndex + 1),
        ]
      }
      state.users = [user, ...state.users]
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
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
})

export const { setUsers, setUser, deleteUser, setFilter } = usersSlice.actions

export default usersSlice.reducer

export const selectUser = (state, username) => {
  return state.users.users.find(user => user.username === username)
}

export const getUsersByFilter = state => {
  if (state.users.filter === 'DUMMY') {
    return state.users.users.filter(user => user.isDummy)
  } else if (state.users.filter === 'ACTIVE') {
    return state.users.users.filter(user => !user.isDummy)
  } else {
    return state.users.users
  }
}
