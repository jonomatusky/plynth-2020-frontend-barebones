import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { useSelector } from 'react-redux'

import { usePieceStore } from 'hooks/store/use-piece-store'
// import { createPiece } from 'redux/piecesSlice'
import FormLayout from 'layouts/FormLayout'
import PieceForm from 'components/PieceForm'
import { BarRow } from 'components/CardSections'
import NotificationModal from 'components/NotificationModal'

const PIECE_VERSION = process.env.REACT_APP_PIECE_VERSION

const NewPiece = () => {
  const { createPiece, newPieceImage, createStatus } = usePieceStore()
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
  const [formValues, setFormValues] = useState({})

  const history = useHistory()

  useEffect(() => {
    if (!newPieceImage) {
      history.push('/')
    }
  }, [history, newPieceImage])

  const handleSubmit = async () => {
    try {
      const piece = await createPiece(formValues)
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
    values.version = PIECE_VERSION
    setFormValues(values)
    setConfirmationModalIsOpen(true)
  }

  const handleCloseConfirmationModal = () => {
    setConfirmationModalIsOpen(false)
  }

  return (
    newPieceImage && (
      <>
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
