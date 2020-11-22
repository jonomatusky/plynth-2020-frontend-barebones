import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  users: [],
  filter: 'ACTIVE',
  status: 'idle',
  updateStatus: 'idle',
  createStatus: 'idle',
}

const isMatch = username => {
  return user => user.username === username
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ headers }) => {
    const { users } = await client.request({
      headers,
      url: '/users',
    })
    return users
  }
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: `/users`,
      method: 'POST',
      data: inputs,
    })
    return user
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ headers, username, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: `/users/${username}`,
      method: 'PATCH',
      data: inputs,
    })
    return user
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ headers, username, ...rest }) => {
    await client.request({
      headers,
      url: `/users/${username}`,
      method: 'DELETE',
    })
    return username
  }
)

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
    setFilter(state, action) {
      state.filter = action.payload
    },
    clearUsers(state, action) {
      state.users = []
      state.status = 'idle'
      state.error = null
      state.updateStatus = 'idle'
      state.createStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload)
      state.users = action.payload
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateUser.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      const user = action.payload
      const matchingIndex = state.users.findIndex(isMatch(user.username))

      if (matchingIndex >= 0) {
        state.users = [
          ...state.users.slice(0, matchingIndex),
          ...state.users.slice(matchingIndex + 1),
        ]
      }
      state.users = [user, ...state.users]
    },
    [updateUser.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
    [createUser.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createUser.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
      const user = action.payload
      state.users = [user, ...state.users]
    },
    [createUser.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [deleteUser.fulfilled]: (state, action) => {
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

export const { setUsers, setUser, setFilter, clearUsers } = usersSlice.actions

export default usersSlice.reducer

export const selectUser = (state, username) => {
  return state.users.users.find(user => user.username === username)
}

export const getUsersByFilter = state => {
  if (state.users.filter === 'DUMMY') {
    return state.users.users.filter(user => user.isDummy)
  } else if (state.users.filter === 'ACTIVE') {
    return state.users.users.filter(user => !user.isDummy)
  } else if (state.users.filter === 'ADMIN') {
    return state.users.users.filter(user => user.admin)
  } else {
    return state.users.users
  }
}
