import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchUser,
  updateUser,
  clearUser,
  fetchUserList,
} from 'redux/userSlice'

export const useUserStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchUser = useCallback(async () => {
    await dispatchThunk(fetchUser)
  }, [dispatchThunk])

  const _fetchUserList = useCallback(async () => {
    await dispatchThunk(fetchUserList)
  }, [dispatchThunk])

  const _updateUser = useCallback(
    async updates => {
      await dispatchThunk(updateUser, { ...updates })
    },
    [dispatchThunk]
  )

  const _clearUser = useCallback(() => {
    dispatch(clearUser)
  }, [dispatch])

  const {
    user,
    users,
    status,
    updateStatus,
    error,
    scanRoute,
    locationHistory,
  } = useSelector(state => state.user)

  return {
    fetchUser: _fetchUser,
    fetchUserList: _fetchUserList,
    updateUser: _updateUser,
    clearUser: _clearUser,
    user,
    users,
    status,
    updateStatus,
    error,
    scanRoute,
    locationHistory,
  }
}

export default useUserStore
