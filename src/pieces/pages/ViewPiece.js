import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useApiClient } from '../../shared/hooks/api-hook'
import { Container } from '@material-ui/core'
import Background from '../../shared/layouts/Background'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/PieceCard'
import ErrorBar from '../../shared/components/notifications/ErrorBar'

const ViewPiece = props => {
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const { pieces } = useSelector(state => state.pieces)
  const { isLoggedIn } = useSelector(state => state.auth)
  const pieceId = useParams().pieceId

  const [piece, setPiece] = useState(() => {
    if (pieces && pieces.length > 0) {
      return pieces.find(piece => piece.id === pieceId)
    } else {
      return null
    }
  })

  const handleClose = () => {
    if (isLoggedIn) {
      history.goBack()
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    if (!piece) {
      const fetchPieces = async () => {
        try {
          const responseData = await sendRequest(`/pieces/${pieceId}`)
          setPiece(responseData.piece)
        } catch (err) {}
      }
      fetchPieces()
    }
  }, [sendRequest, pieceId, piece])

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="xs" disableGutters>
        {isLoading && !piece && <LoadingSpinner asOverlay />}
        {!isLoading && piece && (
          <PieceCard piece={piece} onClose={handleClose} />
        )}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
