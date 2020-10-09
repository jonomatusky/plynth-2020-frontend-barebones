import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../../redux/authSlice'

const Logout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
  })

  return null
}

export default Logout
