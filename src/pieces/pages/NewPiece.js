import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { createPiece } from '../../redux/piecesSlice'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import PieceForm from '../components/PieceForm'
import { BarRow } from '../../shared/components/ui/CardSections'

const NewPiece = () => {
  const dispatchThunk = useThunkClient()
  const { createStatus } = useSelector(state => state.pieces)
  const { newPieceImage } = useSelector(state => state.pieces)
  const history = useHistory()

  useEffect(() => {
    if (!newPieceImage) {
      history.push('/')
    }
  }, [history, newPieceImage])

  const handleSubmit = async values => {
    values.images = [newPieceImage]

    try {
      const piece = await dispatchThunk({
        thunk: createPiece,
        input: { values },
      })
      console.log(piece)
      history.push({
        pathname: `/admin/pieces/${piece.id}`,
        state: { referrer: `/admin/pieces` },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    newPieceImage && (
      <>
        <Background />
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
            onSubmit={handleSubmit}
            imageFilepath={newPieceImage}
            isLoading={createStatus === 'loading'}
          />
        </FormLayout>
      </>
    )
  )
}

export default NewPiece
