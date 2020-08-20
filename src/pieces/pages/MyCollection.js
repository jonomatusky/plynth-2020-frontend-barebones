import React, { useState, useEffect, useContext } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Collection'

const MyCollection = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/users/me/collection`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token,
          }
        )
        setLoadedPieces(responseData.pieces)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest, auth.token])

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
