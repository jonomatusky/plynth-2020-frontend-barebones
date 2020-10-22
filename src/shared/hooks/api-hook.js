import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'

import * as client from '../util/client'

export const useApiClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  let activeAxiosSources = useRef([])

  const sendRequest = useCallback(async config => {
    setIsLoading(true)

    try {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      activeAxiosSources.current.push(source)

      let response = await client.request({
        cancelToken: source.token,
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
    }
  }, [])

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
