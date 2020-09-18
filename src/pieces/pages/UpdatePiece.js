import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Box, Button } from '@material-ui/core'

import Background from '../../shared/components/ui/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import NotificationModal from '../../shared/components/notifications/NotificationModal'
import ActionBar from '../../shared/components/navigation/ActionBar'
import PieceForm from '../components/PieceForm'
import {
  BarRow,
  PieceBox,
  BottomRow,
} from '../../shared/components/ui/CardSections'
import { useApiClient } from '../../shared/hooks/api-hook'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'Edit Piece'

const UpdatePiece = () => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const pieceId = useParams().pieceId

  const history = useHistory()

  const onSubmit = async formData => {
    try {
      const pieceData = { pieceData: formData }
      await sendRequest(
        `/pieces/${pieceId}`,
        'PATCH',
        JSON.stringify(pieceData)
      )
      history.push(`/admin/pieces/${pieceId}`)
    } catch (err) {}
  }

  const handleDelete = async () => {
    await sendRequest(`/pieces/${pieceId}`, 'DELETE')
    history.push(`/admin/pieces/`)
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalIsOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalIsOpen(false)
  }

  return (
    <React.Fragment>
      <NotificationModal
        primaryMessage="Delete This Piece"
        secondaryMessage={`This action cannot be undo. Your image will be removed from our database
        and you will need to re-add it for fans to scan it. Any fans that scan
        the item will see a "No Match" screen.`}
        primaryAction={handleDelete}
        primaryActionLabel="Delete"
        secondaryAction={handleCloseDeleteModal}
        secondaryActionLabel="Cancel"
        open={deleteModalIsOpen}
        handleClose={() => {
          setDeleteModalIsOpen(false)
        }}
      ></NotificationModal>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="sm">
        <Grid container justify="flex-start" direction="column">
          <Box height="5vh"></Box>
          <PieceBox container direction="column">
            <BarRow
              title="Edit Your Piece"
              onClick={() => {
                history.goBack()
              }}
              buttonLabel={'Close X'}
            />
            <Grid item>
              <PieceForm pieceId={pieceId} onSubmit={onSubmit} />
            </Grid>
            <Box height="4vh"></Box>
            <BottomRow container justify="center">
              <Grid>
                <Button color="inherit" onClick={handleOpenDeleteModal}>
                  Delete This Piece
                </Button>
              </Grid>
            </BottomRow>
          </PieceBox>
          <Box height="4vh"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default UpdatePiece
