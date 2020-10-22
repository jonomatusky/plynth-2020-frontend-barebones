import { useCallback, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { AuthContext } from '../context/auth-context'
import { setError } from '../../redux/messageSlice'

export const useThunkClient = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

  const dispatchThunk = useCallback(
    async ({ thunk, inputs, token }) => {
      try {
        const headers = {}

        console.log(token)

        if (token || !!auth.token) {
          headers.Authorization = 'Bearer ' + (token || auth.token)
        }

        console.log(inputs)

        const resultAction = await dispatch(thunk({ headers, ...inputs }))

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
    [dispatch, auth.token]
  )

  return dispatchThunk
}
