import { useCallback, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { AuthContext } from '../context/auth-context'
import { setError } from '../../redux/alertSlice'

export const useThunkClient = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

  const dispatchThunk = useCallback(
    async ({ thunk, inputs, token }) => {
      try {
        const headers = {}

        if (token || !!auth.token) {
          headers.Authorization = 'Bearer ' + (token || auth.token)
        }

        console.log(inputs)
        console.log(token)
        console.log(thunk)

        const resultAction = await dispatch(thunk({ headers, ...inputs }))

        const result = unwrapResult(resultAction)

        return result
      } catch (err) {
        console.log('error caught in thunk')
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
