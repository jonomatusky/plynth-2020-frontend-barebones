import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetchUser, updateUser, clearUser } from 'redux/userSlice'

export const useUserStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchUser = useCallback(async () => {
    await dispatchThunk(fetchUser)
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
    status,
    updateStatus,
    error,
    scanRoute,
    locationHistory,
  } = useSelector(state => state.user)

  return {
    fetchUser: _fetchUser,
    updateUser: _updateUser,
    clearUser: _clearUser,
    user,
    status,
    updateStatus,
    error,
    scanRoute,
    locationHistory,
  }
}
