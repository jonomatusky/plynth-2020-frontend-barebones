import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Grid, Button } from '@material-ui/core'
import Background from '../../shared/layouts/Background'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/PieceCard'

const ViewPiece = props => {
  const history = useHistory()
  const pieceId = useParams().pieceId

  const piece = useSelector(state =>
    (state.pieces.pieces || []).find(piece => piece.id === pieceId)
  )

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs" disableGutters>
        <Grid container>
          {piece && (
            <Grid item>
              <PieceCard piece={piece} />
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={() => history.push(`/admin/pieces/${piece.id}/edit`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        {!piece && <LoadingSpinner asOverlay />}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
