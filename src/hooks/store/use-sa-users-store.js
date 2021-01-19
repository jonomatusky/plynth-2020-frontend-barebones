import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setFilter,
  clearUsers,
} from 'redux/SAusersSlice'

export const useSAUsersStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchUsers = useCallback(async () => {
    await dispatchThunk(fetchUsers)
  }, [dispatchThunk])

  const _createUser = useCallback(
    async data => {
      await dispatchThunk(createUser, data)
    },
    [dispatchThunk]
  )

  const _updateUser = useCallback(
    async ({ username, updates }) => {
      await dispatchThunk(updateUser, { username, updates })
    },
    [dispatchThunk]
  )

  const _deleteUser = useCallback(
    async username => {
      await dispatchThunk(deleteUser, { username })
    },
    [dispatchThunk]
  )

  const _clearUsers = useCallback(() => {
    dispatch(clearUsers)
  }, [dispatch])

  const _setFilter = useCallback(
    filter => {
      dispatch(setFilter(filter))
    },
    [dispatch]
  )

  const { users, status, updateStatus, error, filter } = useSelector(
    state => state.SAusers
  )

  const selectUser = username => {
    return users.find(user => user.username === username)
  }

  const getUsersByFilter = () => {
    if (filter === 'DUMMY') {
      return (users || []).filter(user => user.isDummy)
    } else if (filter === 'ACTIVE') {
      return (users || []).filter(user => !user.isDummy)
    } else if (filter === 'ADMIN') {
      return (users || []).filter(user => user.admin)
    } else {
      return users
    }
  }

  return {
    fetchUsers: _fetchUsers,
    createUser: _createUser,
    updateUser: _updateUser,
    deleteUser: _deleteUser,
    clearUsers: _clearUsers,
    setFilter: _setFilter,
    selectUser,
    getUsersByFilter,
    users,
    status,
    updateStatus,
    error,
  }
}
