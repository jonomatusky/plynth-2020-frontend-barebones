import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Box, Button } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import NotificationModal from '../../shared/components/notifications/NotificationModal'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import PieceForm from '../components/PieceForm'
import {
  BarRow,
  PieceBox,
  BottomRow,
} from '../../shared/components/ui/CardSections'

const UpdatePiece = props => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [piece, setPiece] = useState()
  const pieceId = useParams().pieceId
  const propPiece = (props.location.data || {}).piece

  const history = useHistory()

  useEffect(() => {
    if (!propPiece || propPiece.id !== pieceId) {
      const fetchPieces = async () => {
        try {
          const responseData = await sendRequest(`/pieces/${pieceId}`)
          setPiece(responseData.piece)
        } catch (err) {}
      }
      fetchPieces()
    } else {
      setPiece(propPiece)
    }
  }, [sendRequest, pieceId, propPiece])

  const handleSubmit = async response => {
    history.push(`/admin/pieces/${response.piece.id}`)
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
    <>
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
      />
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="sm">
        {!isLoading && piece ? (
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
                <PieceForm piece={piece} onSubmit={handleSubmit} />
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
        ) : (
          isLoading && !piece && <LoadingSpinner asOverlay />
        )}
      </Container>
    </>
  )
}

export default UpdatePiece
