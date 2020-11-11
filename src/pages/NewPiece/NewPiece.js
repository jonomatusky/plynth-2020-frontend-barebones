import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useThunkClient } from '../../hooks/thunk-hook'
import { createPiece } from '../../redux/piecesSlice'
import Background from '../../layouts/Background'
import FormLayout from '../../layouts/FormLayout'
import PieceForm from '../../components/PieceForm'
import { BarRow } from '../../components/CardSections'
import NotificationModal from '../../components/NotificationModal'

const NewPiece = () => {
  const dispatchThunk = useThunkClient()
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
  const [formValues, setFormValues] = useState({})
  const { createStatus } = useSelector(state => state.pieces)
  const { newPieceImage } = useSelector(state => state.pieces)
  const history = useHistory()

  useEffect(() => {
    if (!newPieceImage) {
      history.push('/')
    }
  }, [history, newPieceImage])

  const handleSubmit = async () => {
    try {
      const piece = await dispatchThunk({
        thunk: createPiece,
        inputs: formValues,
      })
      history.push({
        pathname: `/admin/pieces/${piece.id}`,
        state: { referrer: `/admin/pieces` },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenConfirmationModal = values => {
    values.images = [newPieceImage]
    setFormValues(values)
    setConfirmationModalIsOpen(true)
  }

  const handleCloseConfirmationModal = () => {
    setConfirmationModalIsOpen(false)
  }

  return (
    newPieceImage && (
      <>
        <Background />
        <NotificationModal
          primaryMessage="We Respect Artist’s Rights"
          secondaryMessage={`You are about to publish this piece. Please confirm that you are the copyright holder to this artwork and have the right to display it.`}
          primaryAction={handleSubmit}
          primaryActionLabel={`Confirm`}
          secondaryAction={handleCloseConfirmationModal}
          secondaryActionLabel="Cancel"
          open={confirmationModalIsOpen}
          handleClose={handleCloseConfirmationModal}
          isLoading={createStatus === 'loading'}
        />
        <FormLayout
          bar={
            <BarRow
              title="Edit Your Piece"
              buttonLabel={'Cancel X'}
              onClose={() => {
                history.push(`/admin/pieces`)
              }}
            />
          }
        >
          <PieceForm
            onSubmit={handleOpenConfirmationModal}
            imageFilepath={newPieceImage}
            submitLabel="Create Piece"
          />
        </FormLayout>
      </>
    )
  )
}

export default NewPiece
