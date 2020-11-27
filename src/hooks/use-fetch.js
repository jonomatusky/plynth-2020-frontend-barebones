import { useEffect, useContext } from 'react'

import { AuthContext } from 'contexts/auth-context'
import { useUserStore } from './store/use-user-store'
import { usePieceStore } from './store/use-piece-store'

export const useFetch = () => {
  const auth = useContext(AuthContext)

  const { fetchUser } = useUserStore()
  const { fetchPieces } = usePieceStore()

  useEffect(() => {
    const fetch = async () => {
      await fetchUser()
      await fetchPieces()
    }
    if (auth.authStatus === 'authenticated') {
      console.log('fetching')
      fetch()
    }
  }, [auth.authStatus, fetchPieces, fetchUser])

  return
}
