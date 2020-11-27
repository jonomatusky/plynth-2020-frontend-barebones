import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import jwt from 'jsonwebtoken'

import { clearUser } from 'redux/userSlice'
import { clearPieces } from 'redux/piecesSlice'

let logoutTimer

export const useAuth = () => {
  const dispatch = useDispatch()
  const [token, setToken] = useState(null)
  const [authStatus, setAuthStatus] = useState('loading')

  const login = useCallback(async token => {
    setToken(token)
    setAuthStatus('authenticated')
    try {
      localStorage.setItem('__USER_TOKEN', token)
    } catch (err) {}
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setAuthStatus('unauthenticated')
    dispatch(clearUser())
    dispatch(clearPieces())
    localStorage.removeItem('__USER_TOKEN')
  }, [dispatch])

  useEffect(() => {
    const token = localStorage.getItem('__USER_TOKEN')

    if (token) {
      try {
        const { exp } = jwt.decode(token)

        if (exp * 1000 >= new Date()) {
          login(token)
        }

        const remainingTime = exp * 1000 - new Date().getTime()
        logoutTimer = setTimeout(logout, remainingTime)
        //dispatch set user
      } catch (err) {}
    } else {
      logout()
      clearTimeout(logoutTimer)
    }
  }, [login, logout])

  return { token, login, logout, authStatus }
}
