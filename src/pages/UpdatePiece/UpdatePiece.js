import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

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
    console.log(values)
    try {
      await updatePiece({ id: pieceId, ...values })
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
      {status === 'succeeded' &&
        !!piece &&
        !!piece.version &&
        piece.version !== '1.0' && (
          <FormLayout
            bar={<BarRow title="Edit Your Piece" buttonLabel={'Cancel X'} />}
            bottom={
              <Button color="inherit" onClick={handleOpenDeleteModal}>
                Delete This Piece
              </Button>
            }
          >
            <PieceForm
              piece={piece}
              onSubmit={handleSubmit}
              isLoading={updateStatus === 'loading'}
            />
          </FormLayout>
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
