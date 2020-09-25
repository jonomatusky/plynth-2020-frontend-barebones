import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import axios from 'axios'

const { REACT_APP_BACKEND_URL } = process.env

export const useApiClient = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      let message

      if (url.indexOf('.') < 0) {
        if (auth.token) {
          headers.Authorization = 'Bearer ' + auth.token
        }
        url = REACT_APP_BACKEND_URL.concat(url)
      } else if (url.search('amazonaws') !== -1) {
        message = 'Unable to upload image. Please try again.'
      }

      setIsLoading(true)

      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      try {
        const response = await axios.request({
          url,
          method,
          data,
          headers,
          cancelToken: source.token,
          timeout: 10000,
        })

        setIsLoading(false)
        return response.data
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message)
          return
        } else if (err.response) {
          console.log(err.response)
          setError(message || err.response.data.message)
        } else if (err.request) {
          console.log(err.request)
          setError(
            'Unable to connect to server. Please check your internet connection.'
          )
        } else {
          console.log('Error', err.message)
        }
        setIsLoading(false)
        throw err
      }
    },
    [auth.token]
  )

  const clearError = () => {
    setError(null)
  }

  return { isLoading, error, sendRequest, clearError }
}
