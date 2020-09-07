import React, { useState, useEffect, useContext } from 'react'
import { useApiClient } from '../../shared/hooks/api-hook'

import { Container, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Collection'

const MyCollection = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const auth = useContext(AuthContext)
  let token = auth.token

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(`/users/me/collection`)
        console.log('setting pieces')
        setLoadedPieces(responseData.pieces)
      } catch (err) {}
    }

    fetchPieces()
  }, [sendRequest])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPieces && <PieceList items={loadedPieces} />}
      <Box height="4rem"></Box>
    </Container>
  )
}

export default MyCollection
