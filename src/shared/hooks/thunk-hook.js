import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { setError } from '../../redux/messageSlice'

export const useThunkClient = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  const dispatchThunk = useCallback(
    async ({ thunk, id, inputs }) => {
      try {
        const headers = {}

        if (!!token) {
          headers.Authorization = 'Bearer ' + token
        }

        const resultAction = await dispatch(
          thunk({ id, config: { headers, data: inputs } })
        )

        const result = unwrapResult(resultAction)

        return result
      } catch (err) {
        dispatch(
          setError({
            error: err.message || 'An unknown error occured. Please try again.',
          })
        )
        throw err
      }
    },
    [dispatch, token]
  )

  return dispatchThunk
}
