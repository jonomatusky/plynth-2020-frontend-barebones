import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetchUser, updateUser, clearUser } from 'redux/userSlice'

export const useUserStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchUser = useCallback(() => {
    dispatchThunk(fetchUser)
  }, [dispatchThunk])

  const _updateUser = useCallback(
    updates => {
      dispatchThunk(updateUser, { ...updates })
    },
    [dispatchThunk]
  )

  const _clearUser = useCallback(() => {
    dispatch(clearUser)
  }, [dispatch])

  const { imageUrl, scan, error, status, foundPiece, scanToken } = useSelector(
    state => state.user
  )

  return {
    fetchUser: _fetchUser,
    updateUser: _updateUser,
    clearUser: _clearUser,
    imageUrl,
    scan,
    error,
    status,
    foundPiece,
    scanToken,
  }
}
