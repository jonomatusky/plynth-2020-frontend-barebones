import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useApiClient } from 'hooks/api-hook'
import { setError } from 'redux/alertSlice'
import { Container } from '@material-ui/core'
import LoadingSpinner from 'components/LoadingSpinner'

import PieceCard from 'components/PieceCard'

const ViewPiece = props => {
  const history = useHistory()
  const { isLoading, sendRequest } = useApiClient()
  const { pieces } = useSelector(state => state.pieces)
  const pieceId = useParams().pieceId

  const [piece, setPiece] = useState(() => {
    if (pieces && pieces.length > 0) {
      return pieces.find(piece => piece.id === pieceId)
    } else {
      return null
    }
  })

  useEffect(() => {
    if (!piece) {
      const fetchPiece = async () => {
        try {
          const responseData = await sendRequest(`/pieces/${pieceId}`)
          setPiece(responseData.piece)
        } catch (err) {
          dispatchEvent(setError({ message: err.message }))
        }
      }
      fetchPiece()
    }
  }, [sendRequest, pieceId, piece])

  return (
    <Container maxWidth="xs" disableGutters>
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
  )
}

export default ViewPiece
