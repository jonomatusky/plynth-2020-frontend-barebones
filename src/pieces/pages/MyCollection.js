import React, { useState, useEffect } from 'react'
import { useApiClient } from '../../shared/hooks/api-hook'

import { Container } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const title = 'My Collection'

const MyCollection = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, sendRequest } = useApiClient()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(`/users/me/collection`)
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
    </Container>
  )
}

export default MyCollection
