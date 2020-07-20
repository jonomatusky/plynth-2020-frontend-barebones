import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../shared/hooks/http-hook'

import { Container, Box } from '@material-ui/core'

import PageTitle from '../shared/components/UIElements/PageTitle'
import PieceList from '../pieces/components/PieceList'
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner'
import ScanButtonDemo from '../shared/components/UIElements/ScanButtonDemo'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Collection'

const MyCollection = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [piece, setPiece] = useState()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/users/me/collection`
        )
        setLoadedPieces(responseData.pieces)
        setPiece(loadedPieces[0].id)
        console.log(responseData)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest])

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <PageTitle title={title} />
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && loadedPieces && (
          <PieceList items={loadedPieces} setPiece={setPiece} />
        )}
        <Box height="4rem"></Box>
      </Container>
      <ScanButtonDemo piece={piece} />
    </React.Fragment>
  )
}

export default MyCollection
