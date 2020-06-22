import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Pieces'

const ViewPieces = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces`
        )
        setLoadedPieces(responseData.pieces)
        console.log(responseData)
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

export default ViewPieces
