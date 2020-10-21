import { useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const { REACT_APP_BACKEND_URL } = process.env

const useHttpClient = () => {
  const { token } = useSelector(state => state.auth)

  let activeAxiosSources = useRef([])

  const request = useCallback(
    async ({ url, ...config }) => {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      activeAxiosSources.current.push(source)

      let headers = config.headers || {}

      let message

      if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
        if (token) {
          headers.Authorization = 'Bearer ' + token
        }
        url = REACT_APP_BACKEND_URL.concat(url)
      } else if (url.search('amazonaws') !== -1) {
        message = 'Unable to upload image. Please try again.'
      }

      try {
        const response = await axios.request({
          ...config,
          url,
          headers,
          cancelToken: source.token,
          timeout: 10000,
        })

        activeAxiosSources.current = activeAxiosSources.current.filter(
          reqCtrl => reqCtrl.token !== source.token
        )

        return response.data
      } catch (err) {
        console.log(err)

        if (axios.isCancel(err)) {
          console.log('Request canceled: ', err.message)
          return
        } else if (message) {
          throw new Error(message)
        } else if (((err.response || {}).data || {}).message) {
          console.log(err.response.data.message)
          throw new Error(err.response.data.message)
        } else if (err.request) {
          console.log(err.request)
          throw new Error(
            'Unable to connect to server. Please check your internet connection.'
          )
        } else {
          console.log('Error', err.message)
          return
        }
      }
    },
    [token]
  )

  useEffect(() => {
    return () => {
      activeAxiosSources.current.forEach(source =>
        source.cancel('Operation canceled due to new request.')
      )
    }
  }, [])

  return request
}

export default useHttpClient
