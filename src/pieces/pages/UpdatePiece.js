import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box } from '@material-ui/core'

import PieceForm from '../components/PieceForm'
import PageTitle from '../../shared/components/UIElements/PageTitle'

const title = 'Edit Piece'

const UpdatePiece = () => {
  const pieceId = useParams().pieceId

  return (
    <Container maxWidth="xs">
      <PageTitle title={title} />
      <Grid container width="100%">
        <Grid container direction="column">
          <PieceForm pieceId={pieceId} />
        </Grid>
      </Grid>
      <Box height="5rem" />
    </Container>
  )
}

export default UpdatePiece
