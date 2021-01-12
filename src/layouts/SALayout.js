import React from 'react'

import { useUserStore } from 'hooks/store/use-user-store'
import NoPermission from './NoPermission'
import LoadingSpinner from 'components/LoadingSpinner'

const SALayout = ({ children }) => {
  const { user } = useUserStore()

  return (
    <>
      {user && !!user.admin && { children }}
      {user && !user.admin && <NoPermission />}
      {!user && <LoadingSpinner />}
    </>
  )
}

export default SALayout
