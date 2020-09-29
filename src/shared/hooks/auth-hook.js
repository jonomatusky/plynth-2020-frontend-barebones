import { useState, useCallback, useEffect } from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = useCallback((user, token, expirationDate) => {
    setToken(token)
    setIsLoading(false)
    setUser(user)

    let {
      id,
      username,
      displayName,
      bio,
      links,
      completedSignup,
      avatar,
      avatarLink,
      pieceLimit,
    } = user

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    setTokenExpirationDate(tokenExpirationDate)
    // this is where I could set addititional user data in localStorage (eg, avatar link, bio, links, etc)
    // it would need to be updated when a user changes their info (eg, uploads a new photo)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        user: {
          id,
          username,
          displayName,
          bio,
          links,
          completedSignup,
          avatar,
          avatarLink,
          pieceLimit,
        },
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    )
  }, [])

  const updateUser = useCallback(user => {
    setIsLoading(false)
    setUser(user)

    let {
      id,
      username,
      displayName,
      bio,
      links,
      completedSignup,
      avatar,
      avatarLink,
    } = user

    let storeData = JSON.parse(localStorage.getItem('userData'))

    storeData.user = {
      id,
      username,
      displayName,
      bio,
      links,
      completedSignup,
      avatar,
      avatarLink,
    }

    localStorage.setItem('userData', JSON.stringify(storeData))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUser(null)
    setIsLoading(false)
    localStorage.removeItem('userData')
  }, [])

  const doneLoading = useCallback(() => {
    setIsLoading(false)
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
    if (!token) {
      doneLoading()
    }
  }, [token, doneLoading])

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

  return { token, isLoading, login, logout, user, updateUser }
}
