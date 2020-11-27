import { useCallback, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { AuthContext } from 'contexts/auth-context'
import { setError } from 'redux/alertSlice'

export const useThunk = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

  const dispatchThunk = useCallback(
    async (action, inputs) => {
      try {
        const headers = {}

        if (auth.token) {
          headers.Authorization = 'Bearer ' + auth.token
        }

        const resultAction = await dispatch(action({ headers, ...inputs }))

        const result = unwrapResult(resultAction)

        return result
      } catch (err) {
        dispatch(
          setError({
            message:
              err.message || 'An unknown error occured. Please try again.',
          })
        )
        throw err
      }
    },
    [dispatch, auth.token]
  )

  return dispatchThunk
}
