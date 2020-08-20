import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../shared/context/auth-context'

const Logout = () => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    auth.logout()
  })

  return null
}

export default Logout
