import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { authWithToken, logout } from '../../redux/authSlice'
import { fetchPieces } from '../../redux/piecesSlice'

import { useSelector, useDispatch } from 'react-redux'
import { useThunkClient } from '../../shared/hooks/thunk-hook'
import store from '../../redux/store'

const TokenAuth = () => {
  const dispatchThunk = useThunkClient()
  const authStatus = (useSelector(state => state.auth) || {}).status
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (token && authStatus === 'idle') {
      console.log('authenticating')
      try {
        dispatchThunk({ thunk: authWithToken })
      } catch (err) {}
    }
  }, [dispatchThunk, authStatus, token])

  useEffect(() => {
    const getPieces = async () => {
      try {
        await dispatchThunk({ thunk: fetchPieces })
      } catch (err) {}
    }
    if (authStatus === 'succeeded') {
      getPieces()
    }
  }, [dispatchThunk, authStatus])

  useEffect(() => {
    if (!!token) {
      const { exp } = jwt.decode(token) || {}
      if (Date.now() >= exp * 1000) {
        dispatch(logout())
      }
    }
  }, [dispatch, token])

  store.subscribe(() => {
    const token = store.getState().auth.token
    if (!!token) {
      localStorage.setItem('__USER_TOKEN', store.getState().auth.token)
    }
  })

  return null
}

export default TokenAuth
