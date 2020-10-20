import { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError } from '../../redux/messageSlice'

export const useThunkClient = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  let activeAxiosSources = useRef([])

  const dispatchThunk = useCallback(
    async ({ thunk, input }) => {
      try {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        activeAxiosSources.current.push(source)

        const resultAction = await dispatch(
          thunk({ cancelToken: source.token, token, input })
        )

        const result = unwrapResult(resultAction)

        activeAxiosSources.current = activeAxiosSources.current.filter(
          reqCtrl => reqCtrl.token !== source.token
        )

        return result
      } catch (err) {
        console.log(err)
        err.message && dispatch(setError(err.message))
        throw err
      }
    },
    [dispatch]
  )

  useEffect(() => {
    return () => {
      activeAxiosSources.current.forEach(source =>
        source.cancel('Operation canceled due to new request.')
      )
    }
  }, [])

  return dispatchThunk
}
