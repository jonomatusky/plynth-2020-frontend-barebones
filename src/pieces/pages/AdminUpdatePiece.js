import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { setMessage } from '../../redux/alertSlice'
import { selectPiece, updatePiece, deletePiece } from '../../redux/piecesSlice'
import Background from '../../shared/layouts/Background'
import NotificationModal from '../../shared/components/notifications/NotificationModal'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import AdminPieceForm from '../components/AdminPieceForm'
import { BarRow } from '../../shared/components/ui/CardSections'
import FormLayout from '../../shared/layouts/FormLayout'

const UpdatePiece = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { users } = useSelector(state => state.users)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const updateStatus = useSelector(state => state.pieces)

  const dispatchThunk = useThunkClient()
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))

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
          <AdminPieceForm
            piece={piece}
            users={users}
            onSubmit={handleSubmit}
            isLoading={updateStatus === 'loading'}
          />
        </FormLayout>
      ) : (
        <LoadingSpinner asOverlay />
      )}
    </>
  )
}

export default UpdatePiece
