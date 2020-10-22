import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const { REACT_APP_BACKEND_URL } = process.env

export const useLogClient = () => {
  const { token } = useSelector(state => state.user)

  const sendLog = useCallback(
    async ({ url, data }) => {
      let headers
      if (token) {
        headers.Authorization = 'Bearer ' + token
      }
      url = REACT_APP_BACKEND_URL.concat(url)

      try {
        const response = await axios.request({
          url,
          method: 'PATCH',
          data,
          headers,
          timeout: 10000,
        })

        return response.data
      } catch (err) {}
    },
    [token]
  )

  return { sendLog }
}
