import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Box } from '@material-ui/core'

import PieceForm from '../components/PieceForm'
import PageTitle from '../../shared/components/UIElements/PageTitle'
import { useHttpClient } from '../../shared/hooks/http-hook'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'Edit Piece'

const UpdatePiece = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const pieceId = useParams().pieceId

  const history = useHistory()

  const onSubmit = async formData => {
    try {
      const pieceData = { pieceData: formData }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`,
        'PATCH',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      history.push(`/pieces/${pieceId}`)
    } catch (err) {}
  }

  return (
    <Container maxWidth="xs">
      <PageTitle title={title} />
      <Grid container width="100%">
        <Grid container direction="column">
          <PieceForm pieceId={pieceId} onSubmit={onSubmit} />
        </Grid>
      </Grid>
      <Box height="5rem" />
    </Container>
  )
}

export default UpdatePiece
