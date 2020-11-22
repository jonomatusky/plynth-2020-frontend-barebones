import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import jwt from 'jsonwebtoken'

import { fetchUser, clearUser } from 'redux/userSlice'
import { fetchPieces, clearPieces } from 'redux/piecesSlice'
import { fetchUsers, clearUsers } from 'redux/usersSlice'
import { useThunkClient } from './thunk-hook'

let logoutTimer

export const useAuth = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunkClient()
  const [token, setToken] = useState(null)
  const [authStatus, setAuthStatus] = useState('loading')

  const login = useCallback(
    async token => {
      setToken(token)
      setAuthStatus('authenticated')
      try {
        localStorage.setItem('__USER_TOKEN', token)
        await dispatchThunk({ thunk: fetchUser, token })
        await dispatchThunk({ thunk: fetchPieces, token })
        await dispatchThunk({ thunk: fetchUsers, token })
      } catch (err) {}
    },
    [dispatchThunk]
  )

  const logout = useCallback(() => {
    setToken(null)
    setAuthStatus('unauthenticated')
    dispatch(clearUser())
    dispatch(clearPieces())
    dispatch(clearUsers())
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
      } catch (err) {}
    } else {
      logout()
      clearTimeout(logoutTimer)
    }
  }, [login, logout])

  return { token, login, logout, authStatus }
}
