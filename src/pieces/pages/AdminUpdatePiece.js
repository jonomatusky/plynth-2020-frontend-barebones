import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import NotificationModal from '../../shared/components/notifications/NotificationModal'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import AdminPieceForm from '../components/AdminPieceForm'
import { BarRow } from '../../shared/components/ui/CardSections'
import FormLayout from '../../shared/layouts/FormLayout'

const UpdatePiece = props => {
  const history = useHistory()
  const { users } = useSelector(state => state.users)
  const { error, sendRequest, clearError } = useApiClient()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const pieceId = useParams().pieceId
  const piece = useSelector(state =>
    (state.pieces.pieces || []).find(piece => piece.id === pieceId)
  )

  const handleSubmit = async response => {
    history.goBack()
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
      {piece && users ? (
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
          <AdminPieceForm piece={piece} users={users} onSubmit={handleSubmit} />
        </FormLayout>
      ) : (
        <LoadingSpinner asOverlay />
      )}
    </>
  )
}

export default UpdatePiece
