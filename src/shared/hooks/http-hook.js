import { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth-context'

const { REACT_APP_BACKEND_URL } = process.env

export const useHttpClient = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}, json = true) => {
      setIsLoading(true)

      if (url.search(REACT_APP_BACKEND_URL) !== -1) {
        if (auth.token) {
          headers['Authorization'] = 'Bearer ' + auth.token
        }
      }

      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        })

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        )

        let data

        if (json) {
          data = await response.json()
          if (!response.ok) {
            if (data.message === 'Failed to fetch') {
              throw new Error('Problem fulfilling HTTP request')
            } else {
              throw new Error(data.message)
            }
          }
        } else {
          data = response
          if (!response.ok) {
            throw new Error('Problem fulfilling HTTP request')
          }
        }

        setIsLoading(false)
        return data
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
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
