import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import PieceForm from '../components/PieceForm'

const NewPiece = () => {
  const { newPieceImage } = useSelector(state => state.pieces)
  const history = useHistory()

  useEffect(() => {
    if (!newPieceImage) {
      history.push('/')
    }
  }, [history, newPieceImage])

  const handleSubmit = async response => {
    history.push(`/admin/pieces/${response.piece.id}`)
  }

  return (
    newPieceImage && (
      <>
        <Background />
        <FormLayout>
          <PieceForm onSubmit={handleSubmit} imageFilepath={newPieceImage} />
        </FormLayout>
      </>
    )
  )
}

export default NewPiece
