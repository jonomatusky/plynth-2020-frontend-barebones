import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Box, Container, Grid } from '@material-ui/core'

import { usePieceStore } from 'hooks/store/use-piece-store'
import { useAlertStore } from 'hooks/store/use-alert-store'
import LoadingSpinner from 'components/LoadingSpinner'
import NotificationModal from 'components/NotificationModal'
import NotFound from 'layouts/NotFound'
import PieceForm from 'components/PieceForm'
import PieceFormOld from 'components/PieceFormOld'
import { BarRow } from 'components/CardSections'
import FormLayout from 'layouts/FormLayout'

const UpdatePiece = () => {
  const {
    selectPiece,
    updatePiece,
    deletePiece,
    status,
    updateStatus,
  } = usePieceStore()
  const { setMessage } = useAlertStore()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const pieceId = useParams().pieceId
  const piece = selectPiece(pieceId)

  const history = useHistory()

  const handleSubmit = async values => {
    try {
      await updatePiece({ id: pieceId, ...values })
      history.goBack()
    } catch (err) {}
  }

  const handleDelete = async () => {
    try {
      await deletePiece({ id: pieceId })
      setMessage({ message: 'Your piece has been deleted.' })
      history.push(`/admin/pieces`)
    } catch (err) {}
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
      {status === 'succeeded' &&
        !!piece &&
        !!piece.version &&
        piece.version !== '1.0' && (
          // <FormLayout
          //   bar={<BarRow title="Edit Your Piece" buttonLabel={'Cancel X'} />}
          //   bottom={
          //     <Button color="inherit" onClick={handleOpenDeleteModal}>
          //       Delete This Piece
          //     </Button>
          //   }
          // >
          <Container maxWidth="xs">
            <Box pt="1.5rem" pb="1.5rem">
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Box
                    border={1}
                    borderColor="secondary.main"
                    bgcolor="background.card"
                  >
                    <Grid container justify="center">
                      <Grid item xs={12}>
                        <BarRow
                          title="Edit Your Piece"
                          buttonLabel={'Cancel X'}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Box pt={3} pb={3}>
                          <PieceForm
                            piece={piece}
                            onSubmit={handleSubmit}
                            isLoading={updateStatus === 'loading'}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    borderColor="secondary.main"
                    bgcolor="background.card"
                    border={1}
                    borderTop={0}
                  >
                    <Button
                      fullWidth
                      color="secondary"
                      onClick={handleOpenDeleteModal}
                    >
                      Delete Piece
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      {status === 'succeeded' &&
        !!piece &&
        (!piece.version || piece.version === '1.0') && (
          <FormLayout
            bar={<BarRow title="Edit Your Piece" buttonLabel={'Cancel X'} />}
            bottom={
              <Button color="inherit" onClick={handleOpenDeleteModal}>
                Delete This Piece
              </Button>
            }
          >
            <PieceFormOld
              piece={piece}
              onSubmit={handleSubmit}
              isLoading={updateStatus === 'loading'}
            />
          </FormLayout>
        )}
      {(status === 'loading' || status === 'idle') && (
        <LoadingSpinner asOverlay />
      )}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && !piece && <NotFound />}
    </>
  )
}

export default UpdatePiece
