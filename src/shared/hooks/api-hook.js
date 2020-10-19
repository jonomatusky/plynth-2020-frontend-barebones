import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import * as client from '../util/client'

export const useApiClient = () => {
  const { token } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  let activeAxiosSources = useRef([])

  const sendRequest = useCallback(
    async config => {
      setIsLoading(true)

      console.log(config.url)

      try {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        activeAxiosSources.current.push(source)

        let response = client.request({
          token,
          cancelToken: source.token,
          ...config,
        })

        activeAxiosSources.current = activeAxiosSources.current.filter(
          reqCtrl => reqCtrl.token !== source.token
        )

        setIsLoading(false)
        return response
      } catch (err) {
        console.log(err)
        err.message && setError(err.message)
        setIsLoading(false)
      }
    },
    [token]
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
