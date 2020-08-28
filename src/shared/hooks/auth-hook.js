import { useState, useCallback, useEffect } from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState(null)

  const login = useCallback((user, token, expirationDate) => {
    const id = user.id

    setToken(token)
    setUserId(id)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        user: {
          id,
        },
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  return { token, login, logout, userId }
}
