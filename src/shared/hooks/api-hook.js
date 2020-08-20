import { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth-context'

const { REACT_APP_BACKEND_URL } = process.env

export const useHttpClient = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (extension, method = 'GET', body = null, headers = {}) => {
      const url = `${REACT_APP_BACKEND_URL}/${extension}`
      setIsLoading(true)

      if (method === 'POST' || method === 'PATCH') {
        headers['Content-Type'] = 'application/json'
      }

      if (auth.token) {
        headers.Authorization = auth.token
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

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }

        setIsLoading(false)
        return data
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        throw err
      }
    },
    []
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
