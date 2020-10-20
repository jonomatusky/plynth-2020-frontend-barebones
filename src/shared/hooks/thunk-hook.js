import { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios'

export const useThunkClient = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  let activeAxiosSources = useRef([])

  const dispatchThunk = useCallback(
    async ({ action, input }) => {
      setIsLoading(true)

      try {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        activeAxiosSources.current.push(source)

        const resultAction = await dispatch(
          action({ cancelToken: source.token, ...input })
        )

        unwrapResult(resultAction)

        activeAxiosSources.current = activeAxiosSources.current.filter(
          reqCtrl => reqCtrl.token !== source.token
        )

        setIsLoading(false)
        return resultAction
      } catch (err) {
        console.log(err)
        err.message && setError(err.message)
        setIsLoading(false)
        throw err
      }
    },
    [dispatch]
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeAxiosSources.current.forEach(source =>
        source.cancel('Operation canceled due to new request.')
      )
    }
  }, [])

  return { dispatchThunk, error, clearError, isLoading }
}
