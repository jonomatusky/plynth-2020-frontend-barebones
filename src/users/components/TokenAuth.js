import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { authWithToken, logout } from './redux/authSlice'
import { fetchPieces } from './redux/piecesSlice'

import { useSelector, useDispatch } from 'react-redux'

const TokenAuth = () => {
  const authStatus = (useSelector(state => state.auth) || {}).status
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (token && authStatus === 'idle') {
      console.log('authenticating')
      dispatch(authWithToken())
    }
  }, [dispatch, authStatus, token])

  useEffect(() => {
    if (authStatus === 'suceeded') {
      dispatch(fetchPieces())
    }
  }, [dispatch, authStatus])

  useEffect(() => {
    if (!!token) {
      const { exp } = jwt.decode(token) || {}
      console.log(exp * 1000)
      console.log(new Date())
      if (Date.now() >= exp * 1000) {
        dispatch(logout())
      }
    }
  }, [dispatch, token])
}

export default TokenAuth
