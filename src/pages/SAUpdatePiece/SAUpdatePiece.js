import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'
import { useRequest } from 'hooks/use-request'
import { useAlertStore } from 'hooks/store/use-alert-store'
import Background from 'layouts/Background'
import NotificationModal from 'components/NotificationModal'
import LoadingSpinner from 'components/LoadingSpinner'
import PieceForm from 'components/PieceForm'
import { BarRow } from 'components/CardSections'
import FormLayout from 'layouts/FormLayout'

const UpdatePiece = props => {
  const history = useHistory()
  const { users } = useSAUsersStore()
  const {
    piece,
    updatePiece,
    updateStatus,
    fetchPiece,
    pieceStatus,
    deletePiece,
    status,
  } = useSAPiecesStore()
  const { setMessage } = useAlertStore()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const pieceId = useParams().pieceId
  const { request } = useRequest()

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log('fetching')
        await fetchPiece(pieceId)
      } catch (err) {}
    }

    if (pieceStatus === 'idle') {
      fetch()
    }
  }, [pieceId, request, pieceStatus, fetchPiece])

  const handleSubmit = async values => {
    console.log('submitting')
    console.log(values)

    try {
      await updatePiece({ id: pieceId, ...values })
      // dispatch(setMessage({ message: 'Your piece has been updated.' }))
      history.goBack()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      await deletePiece({ id: pieceId })
      setMessage({ message: 'Your piece has been deleted.' })
      history.push(`/admin/pieces`)
    } catch (err) {
      console.log(err)
    }
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
      <Background />
      {piece && users ? (
        <FormLayout
          bar={
            <BarRow
              title="Edit Piece"
              onClick={() => {
                history.goBack()
              }}
              buttonLabel={'Cancel X'}
            />
          }
          bottom={
            <Button color="inherit" onClick={handleOpenDeleteModal}>
              Delete This Piece
            </Button>
          }
        >
          {(pieceStatus === 'loading' || status === 'idle') && (
            <Container maxWidth="xs">
              <LoadingSpinner asOverlay />
            </Container>
          )}
          {pieceStatus === 'succeeded' && (
            <PieceForm
              piece={piece}
              users={users}
              onSubmit={handleSubmit}
              isLoading={updateStatus === 'loading'}
            />
          )}
        </FormLayout>
      ) : (
        <LoadingSpinner asOverlay />
      )}
    </>
  )
}

export default UpdatePiece
