import { useState, useEffect, useCallback, useRef, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../contexts/auth-context'
import * as client from '../util/client'

export const useApiClient = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  let activeAxiosSources = useRef([])

  const sendRequest = useCallback(
    async config => {
      setIsLoading(true)

      try {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        activeAxiosSources.current.push(source)

        const headers = {}

        if (auth.token) {
          headers.Authorization = 'Bearer ' + auth.token
        }

        let response = await client.request({
          cancelToken: source.token,
          headers,
          ...config,
        })

        activeAxiosSources.current = activeAxiosSources.current.filter(
          reqCtrl => reqCtrl.token !== source.token
        )

        setIsLoading(false)
        return response
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        throw err
      }
    },
    [auth.token]
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

  return { isLoading, error, sendRequest, clearError }
}
