import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectPiece } from '../../redux/piecesSlice'
import { useApiClient } from '../../shared/hooks/api-hook'
import { Container } from '@material-ui/core'
import Background from '../../shared/layouts/Background'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/PieceCard'
import ErrorBar from '../../shared/components/notifications/ErrorBar'

const ViewPiece = props => {
  const { error, sendRequest, clearError } = useApiClient()
  const pieceId = useParams().pieceId
  const existingPiece = useSelector(state => selectPiece(state, pieceId))

  const { status } = useSelector(state => state.pieces)
  const [piece, setPiece] = useState(null)

  useEffect(() => {
    if (status === 'succeeded') {
      if (!!existingPiece) {
        setPiece(existingPiece)
      } else {
        const fetchPiece = async () => {
          try {
            const responseData = await sendRequest(`/pieces/${pieceId}`)
            setPiece(responseData.piece)
          } catch (err) {}
        }
        fetchPiece()
      }
    }
  }, [sendRequest, pieceId, existingPiece, status])

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="xs" disableGutters>
        {!piece && <LoadingSpinner asOverlay />}
        {!!piece && <PieceCard piece={piece} />}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
