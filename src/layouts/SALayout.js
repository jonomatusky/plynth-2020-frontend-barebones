import React, { useEffect } from 'react'

import { useUserStore } from 'hooks/store/use-user-store'
import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'
import NoPermission from './NoPermission'
import LoadingSpinner from 'components/LoadingSpinner'
import SANavigation from 'components/SANavigation'

const SALayout = ({ children }) => {
  const { status: userStatus, user } = useUserStore()
  const { status: usersStatus, fetchUsers } = useSAUsersStore()
  const { status: piecesStatus, fetchPieces } = useSAPiecesStore()

  useEffect(() => {
    const fetch = () => {
      fetchUsers()
      fetchPieces()
    }

    if (
      usersStatus === 'idle' &&
      piecesStatus === 'idle' &&
      userStatus === 'succeeded' &&
      user.admin
    ) {
      fetch()
    }
  }, [
    fetchUsers,
    fetchPieces,
    userStatus,
    usersStatus,
    piecesStatus,
    user.admin,
  ])

  return (
    <>
      {(userStatus === 'idle' || userStatus === 'loading') && (
        <LoadingSpinner />
      )}
      {userStatus === 'failed' && !user.admin && <NoPermission />}
      {userStatus === 'succeeded' && !!user.admin && (
        <SANavigation>{children}</SANavigation>
      )}
    </>
  )
}

export default SALayout
