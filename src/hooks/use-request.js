import { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { AuthContext } from 'contexts/auth-context'
import * as client from 'util/client'
import { setError } from 'redux/alertSlice'

export const useRequest = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const [status, setStatus] = useState('idle')

  let activeAxiosSources = useRef([])

  const request = useCallback(
    async config => {
      setStatus('loading')

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

        setStatus('succeeded')
        return response
      } catch (err) {
        dispatch(
          setError({
            message:
              err.message || 'An unknown error occured. Please try again.',
          })
        )
        setStatus('failed')
        throw err
      }
    },
    [dispatch, auth.token]
  )

  useEffect(() => {
    return () => {
      activeAxiosSources.current.forEach(source =>
        source.cancel('Operation canceled due to new request.')
      )
    }
  }, [])

  return { status, request }
}
