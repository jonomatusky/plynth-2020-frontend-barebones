import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useApiClient } from '../../shared/hooks/api-hook'
import { Container } from '@material-ui/core'
import Background from '../../shared/layouts/Background'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/PieceCard'
import ErrorBar from '../../shared/components/notifications/ErrorBar'

const ViewPiece = props => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [piece, setPiece] = useState((props.location.data || {}).piece)
  const pieceId = useParams().pieceId

  const history = useHistory()

  useEffect(() => {
    if (!piece || piece.id !== pieceId) {
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
      <Container maxWidth="sm" disableGutters>
        {isLoading && !piece && <LoadingSpinner asOverlay />}
        {!isLoading && piece && (
          <PieceCard
            piece={piece}
            onClose={() => {
              history.push('/admin/pieces')
            }}
          />
        )}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
