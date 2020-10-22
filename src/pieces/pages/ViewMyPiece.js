import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

import { selectPiece } from '../../redux/piecesSlice'

import Background from '../../shared/layouts/Background'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import NotFound from '../../shared/components/navigation/NotFound'
import PieceCard from '../components/PieceCard'

const ViewPiece = props => {
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))

  const { status } = useSelector(state => state.pieces)

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs" disableGutters>
        {(status === 'loading' || status === 'idle') && (
          <LoadingSpinner asOverlay />
        )}
        {status === 'succeeded' && !!piece && <PieceCard piece={piece} />}
        {status === 'failed' && <NotFound />}
        {status === 'succeeded' && !piece && <NotFound />}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
