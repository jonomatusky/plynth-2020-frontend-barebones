import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useRequest } from 'hooks/use-request'
import { Container } from '@material-ui/core'
import LoadingSpinner from 'components/LoadingSpinner'

import PieceCard from 'components/PieceCard'

const ViewPiece = props => {
  const history = useHistory()
  const { isLoading, request } = useRequest()
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
          const responseData = await request(`/pieces/${pieceId}`)
          setPiece(responseData.piece)
        } catch (err) {}
      }
      fetchPiece()
    }
  }, [request, pieceId, piece])

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
