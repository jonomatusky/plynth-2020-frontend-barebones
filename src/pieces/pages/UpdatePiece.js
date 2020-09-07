import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Box, Button } from '@material-ui/core'

import PieceForm from '../components/PieceForm'
import Background from '../../shared/components/UIElements/Background'
import {
  BarRow,
  PieceBox,
  BottomRow,
} from '../../shared/components/UIElements/CardSections'
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
      history.push(`/admin/pieces/${pieceId}`)
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="sm">
        <Grid container justify="flex-start" direction="column">
          <Box height="5vh"></Box>
          <PieceBox container direction="column">
            <BarRow
              onClick={() => {
                history.goBack()
              }}
              buttonLabel={'Close X'}
            />
            <Grid item>
              <PieceForm pieceId={pieceId} onSubmit={onSubmit} />
            </Grid>
            <Box height="4vh"></Box>
          </PieceBox>
          <Box height="10vh"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default UpdatePiece
