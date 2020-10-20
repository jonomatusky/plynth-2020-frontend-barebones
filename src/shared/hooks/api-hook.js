import { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { setError } from '../../redux/messageSlice'
import * as client from '../util/client'

export const useApiClient = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  let activeAxiosSources = useRef([])

  const sendRequest = useCallback(
    async config => {
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

        return response
      } catch (err) {
        console.log(err)
        err.message && dispatch(setError(err.message))
      }
    },
    [token, dispatch]
  )

  useEffect(() => {
    return () => {
      activeAxiosSources.current.forEach(source =>
        source.cancel('Operation canceled due to new request.')
      )
    }
  }, [])

  return sendRequest
}
