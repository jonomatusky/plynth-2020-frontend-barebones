import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { useThunkClient } from 'hooks/thunk-hook'
import { setMessage } from 'redux/alertSlice'
import { selectPiece, updatePiece, deletePiece } from 'redux/piecesSlice'
import LoadingSpinner from 'components/LoadingSpinner'
import NotificationModal from 'components/NotificationModal'
import NotFound from 'layouts/NotFound'
import PieceForm from 'components/PieceForm'
import { BarRow } from 'components/CardSections'
import FormLayout from 'layouts/FormLayout'

const UpdatePiece = () => {
  const dispatch = useDispatch()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))

  const dispatchThunk = useThunkClient()
  const { status, updateStatus } = useSelector(state => state.pieces)

  const history = useHistory()

  const handleSubmit = async values => {
    try {
      await dispatchThunk({
        thunk: updatePiece,
        inputs: { id: pieceId, ...values },
      })
      // dispatch(setMessage({ message: 'Your piece has been updated.' }))
      history.goBack()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      await dispatchThunk({
        thunk: deletePiece,
        inputs: { id: pieceId },
      })
      dispatch(setMessage({ message: 'Your piece has been deleted.' }))
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
      {status === 'succeeded' && !!piece && (
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
      {(status === 'loading' || status === 'idle') && (
        <LoadingSpinner asOverlay />
      )}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && !piece && <NotFound />}
    </>
  )
}

export default UpdatePiece