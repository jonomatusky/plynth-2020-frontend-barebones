import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

import { selectPiece } from 'redux/piecesSlice'

import LoadingSpinner from 'components/LoadingSpinner'
import NotFound from 'layouts/NotFound'
import PieceCard from 'components/PieceCard'

const ViewPiece = props => {
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))

  const { status } = useSelector(state => state.pieces)

  return (
    <React.Fragment>
      {(status === 'loading' || status === 'idle') && (
        <Container maxWidth="xs" disableGutters>
          <LoadingSpinner asOverlay />
        </Container>
      )}
      {status === 'succeeded' && !!piece && (
        <Container maxWidth="xs" disableGutters>
          <PieceCard piece={piece} />
        </Container>
      )}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && !piece && <NotFound />}
    </React.Fragment>
  )
}

export default ViewPiece
