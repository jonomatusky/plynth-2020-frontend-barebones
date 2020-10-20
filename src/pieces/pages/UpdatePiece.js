import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { selectPiece, updatePiece, deletePiece } from '../../redux/piecesSlice'
import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import NotificationModal from '../../shared/components/notifications/NotificationModal'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import PieceForm from '../components/PieceForm'
import { BarRow } from '../../shared/components/ui/CardSections'
import FormLayout from '../../shared/layouts/FormLayout'

const UpdatePiece = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))

  const { isLoading, error, dispatchThunk, clearError } = useThunkClient()

  const history = useHistory()

  const handleSubmit = async values => {
    try {
      await dispatchThunk({
        action: updatePiece,
        input: { id: pieceId, updates: values },
      })
      history.push(`/admin/pieces/${pieceId}`)
    } catch (err) {}
  }

  const handleDelete = async () => {
    await dispatchThunk({
      action: deletePiece,
      input: { piece },
    })
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
      {piece ? (
        <FormLayout
          bar={
            <BarRow
              title="Edit Your Piece"
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
          <PieceForm
            piece={piece}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </FormLayout>
      ) : (
        !piece && <LoadingSpinner asOverlay />
      )}
    </>
  )
}

export default UpdatePiece
