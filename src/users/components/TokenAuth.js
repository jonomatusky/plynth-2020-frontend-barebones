import { useEffect } from 'react'
// import jwt from 'jsonwebtoken'
import { authWithToken, logout, autoLogin } from '../../redux/userSlice'
// import { fetchPieces } from '../../redux/piecesSlice'

import { useSelector, useDispatch } from 'react-redux'
// import { useThunkClient } from '../../shared/hooks/thunk-hook'
// import store from '../../redux/store'

const TokenAuth = () => {
  // const dispatchThunk = useThunkClient()
  // const authStatus = (useSelector(state => state.user) || {}).status
  // const token = localStorage.getItem('__USER_TOKEN')

  const dispatch = useDispatch()

  useEffect(() => {
    const loginAutomatically = async () => {
      await dispatch(autoLogin())
    }
    console.log('autologin')
    loginAutomatically()
  }, [dispatch])

  // useEffect(() => {
  //   if (token && authStatus === 'idle') {
  //     console.log('authenticating')
  //     try {
  //       dispatchThunk({ thunk: authWithToken })
  //     } catch (err) {}
  //   }
  // }, [dispatchThunk, authStatus, token])

  // useEffect(() => {
  //   const getPieces = async () => {
  //     try {
  //       await dispatchThunk({ thunk: fetchPieces })
  //     } catch (err) {}
  //   }
  //   if (authStatus === 'succeeded') {
  //     getPieces()
  //   }
  // }, [dispatchThunk, authStatus])

  // useEffect(() => {
  //   if (authStatus ==='idle' && !!token && token !== 'null' && token !== 'undefined') {
  //     try {
  //       const { exp } = jwt.decode(token) || {}
  //       if (Date.now() >= exp * 1000) {
  //         dispatch(logout())
  //         localStorage.removeItem('__USER_TOKEN')
  //       }
  //     } catch(err) {
  //       dispatch(logout())
  //       localStorage.removeItem('__USER_TOKEN')
  //     }

  //   } else {
  //     dispatch(authWithToken({token}))
  //   }
  // }, [dispatch, token])

  // store.subscribe(() => {
  //   const token = store.getState().auth.token
  //   if (!!token) {
  //     localStorage.setItem('__USER_TOKEN', store.getState().auth.token)
  //   }
  // })

  return null
}

export default TokenAuth
